using ClosedXML.Excel;
using FileHelpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using ETS.Core.Enums;

namespace ETS.Core.Helpers
{
    public static class FileHelper
    {
        public static string GetContentType(this string extension)
        {
            if (extension == null)
            {
                throw new ArgumentNullException("extension");
            }

            if (!extension.StartsWith("."))
            {
                extension = "." + extension;
            }

            string mime;

            return _mappings.TryGetValue(extension, out mime) ? mime : "application/octet-stream";
        }


        private static object[] ReadMultiRecordFile(byte[] fileBytes, Func<MultiRecordEngine, string, Type> recordSelector, params Type[] types)
        {
            using (var memory = new MemoryStream(fileBytes))
            using (var reader = new StreamReader(memory))
            {
                var engine = new MultiRecordEngine(recordSelector.Invoke, types);
                return engine.ReadStream(reader);
            }

        }

        #region "Fixed Length"

        public static object[] ReadMultiRecordFixedLength(byte[] fileBytes, Func<MultiRecordEngine, string, Type> recordSelector, params Type[] types)
        {
            return ReadMultiRecordFile(fileBytes, recordSelector, types);
        }


        #endregion


        # region "CSV"

        public static T[] ReadDelimitedCsv<T>(byte[] fileBytes) where T : class
        {
            using (var memory = new MemoryStream(fileBytes))
            using (var reader = new StreamReader(memory))
            {
                var engine = new FileHelpers.DelimitedFileEngine(typeof(T), Encoding.UTF8);

                return (T[])engine.ReadStream(reader);
            }

        }

        public static object[] ReadDelimitedCsv(byte[] fileBytes, Func<MultiRecordEngine, string, Type> recordSelector, params Type[] types)
        {
            return ReadMultiRecordFile(fileBytes, recordSelector, types);

        }

        public static byte[] GenerateDelimitedCsv<T>(this IEnumerable<T> exportItems) where T : class
        {
            byte[] bytes;

            using (var stream = new MemoryStream())
            {
                using (var sWriter = new StreamWriter(stream))
                {
                    var engine = new FileHelpers.DelimitedFileEngine<T>(Encoding.UTF8)
                    {
                        HeaderText = typeof(T).GetCsvHeader()
                    };
                    engine.WriteStream(sWriter, exportItems);
                    sWriter.Flush();
                }

                bytes = stream.ToArray();
            }

            return bytes;
        }

        #endregion

        #region "Excel"

        public static T[] ReadExcel<T>(byte[] bytes)
            where T : ExcelImportBase

        {
            var memoryStream = new MemoryStream(bytes)
            {
                Position = 0
            };


            var returnList = new List<T>();

            using (var myWorkbook = SpreadsheetDocument.Open(memoryStream, true))
            {

                var workbookPart = myWorkbook.WorkbookPart;
                var worksheetPart = workbookPart.WorksheetParts.First();
                var sstpart = workbookPart.GetPartsOfType<SharedStringTablePart>().First();
                var sharedStringTable = sstpart.SharedStringTable;



                var sheetData = worksheetPart.Worksheet.GetFirstChild<SheetData>();
                var rows = sheetData.Descendants<Row>();


                var columnDictionary = GetHeaderIndexes(sheetData.Descendants<Row>().First(), sharedStringTable);


                foreach (var row in rows)
                {
                    if (row.RowIndex <= 1) // Alternatively rather than skipping validate that header rows column name match exactly T properties
                        continue;


                    var instance = (T)Activator.CreateInstance(typeof(T));

                    foreach (var c in row.Elements<Cell>())
                    {
                        var colIndex = GetColumnIndex(c.CellReference);
                        if ((colIndex == null) || !columnDictionary.ContainsKey(colIndex.Value)) continue;


                        var property = columnDictionary[colIndex.Value];
                        var propertyInfo = instance.GetType().GetProperty(property);
                        if (propertyInfo == null)
                            continue;



                        var cellValue = string.Empty;

                        if ((c.DataType != null) && (c.DataType == CellValues.SharedString))
                        {
                            var sharedStringId = int.Parse(c.CellValue.Text);
                            cellValue = sharedStringTable.ChildElements[sharedStringId].InnerText;
                        }
                        else if (c.CellValue != null)
                        {
                            cellValue = c.CellValue.Text;
                        }

                        if (string.IsNullOrEmpty(cellValue)) continue;

                        try
                        {
                            var t = Nullable.GetUnderlyingType(propertyInfo.PropertyType) ?? propertyInfo.PropertyType;
                            object safeValue;
                            if (t == typeof(bool))
                            {
                                safeValue = cellValue == SelectionMethod.Yes.ToString();
                            }
                            else if (t == typeof(DateTime))
                            {
                                safeValue = DateTime.FromOADate(double.Parse(cellValue)); ;
                            }
                            else if (t.IsEnum)
                            {
                                safeValue = Enum.Parse(t, cellValue);
                            }
                            else
                            {
                                safeValue = (cellValue == null) ? null : Convert.ChangeType(cellValue, t);
                            }


                            propertyInfo.SetValue(instance, safeValue, null);

                        }
                        catch (Exception exception)
                        {
                            // Put in Error Collection
                            instance.Errors.Add(new ExcelErrorItem
                            {
                                RowIndex = row.RowIndex,
                                Column = property,
                                Error = exception.Message
                            });

                        }
                    }

                    returnList.Add(instance);

                    //var rowIdProperty = instance.GetType().GetProperty(columnDictionary[1]);
                    //if (Convert.ToInt32(rowIdProperty.GetValue(instance, null)) > 0)
                       
                }

            }
            return returnList.ToArray();
        }

        public static bool ValidateExcelHeader<T>(Stream inputStream)
        {
            var memoryStream = new MemoryStream();
            inputStream.CopyTo(memoryStream);
            inputStream.Position = 0;

            var isValidHeader = true;
            using (var myWorkbook = SpreadsheetDocument.Open(memoryStream, true))
            {
                var workbookPart = myWorkbook.WorkbookPart;
                var worksheetPart = workbookPart.WorksheetParts.First();
                var sstpart = workbookPart.GetPartsOfType<SharedStringTablePart>().First();
                var sharedStringTable = sstpart.SharedStringTable;
                var sheetData = worksheetPart.Worksheet.GetFirstChild<SheetData>();


                var columnDictionary = GetHeaderIndexes(sheetData.Descendants<Row>().First(), sharedStringTable).ToList();
                var typeProperties = typeof(T).GetProperties().Select(p => p.Name).ToList()              ;


                columnDictionary.ForEach(i =>
                {
                    if (typeProperties.All(p => p != i.Value))
                    {
                        isValidHeader = false;
                    }
                });

            }

            return isValidHeader;
        }

        private static Dictionary<uint, string> GetHeaderIndexes(Row row, SharedStringTable sst)
        {
            var columnDictionary = new Dictionary<uint, string>();

            foreach (var c in row.Elements<Cell>())
            {
                if ((c.DataType == null) || (c.DataType != CellValues.SharedString)) continue;

                var ssid = int.Parse(c.CellValue.Text);
                var header = sst.ChildElements[ssid].InnerText;
                var colIndex = GetColumnIndex(c.CellReference);
                columnDictionary.Add(colIndex.GetValueOrDefault(), Regex.Replace(header, @"\s+", ""));
            }

            return columnDictionary;
        }



        public static byte[] GenerateExcel(this System.Data.DataTable dataTable, string worksheetName, string reportName,
            ExcelReportHeaderRowOption excelReportHeaderRowOption = ExcelReportHeaderRowOption.None, bool mergeHeaderRow = false)
        {
            byte[] bytes;
            var excelRowCounter = 1; // Excel rows start with Row = 1
            var columnPropertiesList = new List<ExcelColumnProperties>();
            var rainbowColours = new List<XLColor> { XLColor.FromArgb(255, 125, 125), XLColor.FromArgb(255, 202, 149), XLColor.FromArgb(255, 255, 168), XLColor.FromArgb(149, 125, 149), XLColor.FromArgb(89, 172, 255), XLColor.FromArgb(255, 140, 255), XLColor.FromArgb(215, 174, 255) };
            var colourIdx = 0;

            using (var wb = new XLWorkbook(XLEventTracking.Disabled))
            {
                var ws = wb.Worksheets.Add(worksheetName);

                for (var columnCounter = 0; columnCounter < dataTable.Columns.Count; columnCounter++)
                {
                    var excelColumnProperty = new ExcelColumnProperties();
                    excelColumnProperty.DataType = GetExcelColumnDataType(dataTable.Columns[columnCounter].DataType);

                    if (dataTable.Columns[columnCounter].ExtendedProperties.ContainsKey(DataTableExtendedProperties.CellNumberFormat))
                    {
                        excelColumnProperty.CellNumberFormat = dataTable.Columns[columnCounter].ExtendedProperties[DataTableExtendedProperties.CellNumberFormat].ToString();
                    }

                    columnPropertiesList.Add(excelColumnProperty);
                }

                var headerRowIdx = 1;
                var headerColumnIdx = 1;
                //Write report header
                WriteXlCellValue(ws, headerRowIdx++, headerColumnIdx, reportName, null);
                WriteXlCellValue(ws, headerRowIdx++, headerColumnIdx, "Run Date", DateTimeProvider.Now, XLDataType.DateTime, "dd-MMM-yyyy HH:mm:ss");

                excelRowCounter = headerRowIdx;
                switch (excelReportHeaderRowOption)
                {
                    case ExcelReportHeaderRowOption.CreatFromColumnCaption:
                        for (var columnCounter = 0; columnCounter < dataTable.Columns.Count; columnCounter++)
                        {
                            ws.Cell(excelRowCounter, columnCounter + 1).Value = dataTable.Columns[columnCounter].Caption;
                        }
                        excelRowCounter++;
                        break;
                }


                var previousColumnValue = string.Empty;
                // Create Rows. 
                for (var rowCounter = 0; rowCounter < dataTable.Rows.Count; rowCounter++, excelRowCounter++)
                {
                    for (var columnCounter = 0; columnCounter < dataTable.Columns.Count; columnCounter++)
                    {
                        // Detail Column starts from Column = 1
                        ws.Cell(excelRowCounter, columnCounter + 1).Value = dataTable.Rows[rowCounter][columnCounter];
                        ws.Cell(excelRowCounter, columnCounter + 1).DataType = columnPropertiesList[columnCounter].DataType;

                        if (!String.IsNullOrEmpty(columnPropertiesList[columnCounter].CellNumberFormat))
                        {
                            ws.Cell(excelRowCounter, columnCounter + 1).Style.NumberFormat.Format = columnPropertiesList[columnCounter].CellNumberFormat;
                        }

                    }

                    if (mergeHeaderRow && excelRowCounter == headerRowIdx)
                    {
                        var headerColumnCounter = 3;
                        previousColumnValue = ws.Cell(excelRowCounter, headerColumnCounter).Value.ToString();
                        var mergeStartingColumn = headerColumnCounter;
                        var mergeEndingColumn = headerColumnCounter;
                        while (!string.IsNullOrEmpty(ws.Cell(headerRowIdx, headerColumnCounter).Value.ToString()))
                        {
                            if (previousColumnValue.Equals(ws.Cell(headerRowIdx, headerColumnCounter).Value))
                            {
                                mergeEndingColumn++;
                            }
                            else
                            {
                                if (mergeEndingColumn > mergeStartingColumn)
                                {
                                    MergeXlRowCells(ws, headerRowIdx, mergeStartingColumn, mergeEndingColumn - 1);
                                    SetXlCellBackgroundColor(ws, headerRowIdx, mergeStartingColumn,
                                        rainbowColours[colourIdx]);
                                    colourIdx = colourIdx >= 6 ? 0 : colourIdx + 1;
                                    mergeStartingColumn = headerColumnCounter;
                                    mergeEndingColumn = headerColumnCounter + 1;
                                }
                            }
                            previousColumnValue = ws.Cell(headerRowIdx, headerColumnCounter).Value.ToString();
                            headerColumnCounter++;
                        }

                        if (mergeEndingColumn > mergeStartingColumn)
                        {
                            MergeXlRowCells(ws, headerRowIdx, mergeStartingColumn, mergeEndingColumn - 1);
                            SetXlCellBackgroundColor(ws, headerRowIdx, mergeStartingColumn,
                                rainbowColours[colourIdx]);
                            colourIdx = colourIdx >= 6 ? 0 : colourIdx + 1;
                        }
                    }
                }

                ws.Columns().AdjustToContents();

                using (var stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    bytes = stream.ToArray();
                }
            }

            return bytes;
        }

        private static XLDataType GetExcelColumnDataType(System.Type dataType)
        {
            if (dataType == typeof(decimal))
            {
                return XLDataType.Number;
            }

            if (dataType == typeof(Boolean))
            {
                return XLDataType.Boolean;
            }

            if (dataType == typeof(DateTime))
            {
                return XLDataType.DateTime;
            }

            if (dataType == typeof(TimeSpan))
            {
                return XLDataType.TimeSpan;
            }

            return XLDataType.Text;
        }

        public static void WriteXlCellValue(IXLWorksheet ws, int row, int column, string title, object value, XLDataType cellValues = XLDataType.Text, string cellFormat = null)
        {
            ws.Cell(row, column).Value = value == null
                                          ? string.Format("{0}", title)
                                          : string.Format("{0}:", title);
            if (value != null)
            {
                ws.Cell(row, column).Value = value;
                ws.Cell(row, column).DataType = cellValues;

                if (!string.IsNullOrWhiteSpace(cellFormat))
                    ws.Cell(row, column).Style.NumberFormat.Format = cellFormat;

                ws.Cell(row, column).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;
            }
        }

        public static bool HasCellValue(IXLWorksheet ws, int row, int column)
        {
            return !string.IsNullOrEmpty(ws.Cell(row, column).Value.ToString());
        }

        public static void MergeXlRowCells(IXLWorksheet ws, int row, int startingColumn, int endingColumn)
        {
            ws.Range(ws.Cell(row, startingColumn).Address.ToString() + ":" + ws.Cell(row, endingColumn).Address.ToString()).Merge();
        }

        public static void SetXlCellBackgroundColor(IXLWorksheet ws, int row, int column, XLColor aXlColor)
        {
            var aCell = ws.Cell(row, column);
            ((aCell.Style).Fill).PatternType = XLFillPatternValues.Solid;
            ((aCell.Style).Fill).SetBackgroundColor(aXlColor);
        }

        static uint? GetColumnIndex(string cellName)
        {
            uint ci = 0;
            cellName = cellName.ToUpper();
            for (int ix = 0; ix < cellName.Length && cellName[ix] >= 'A'; ix++)
                ci = (ci * 26) + ((uint)cellName[ix] - 64);
            return ci;
        }

        // Given a cell name, parses the specified cell to get the row index.
        static uint GetRowIndex(string cellName)
        {
            // Create a regular expression to match the row index portion the cell name.
            var regex = new Regex(@"\d+");
            var match = regex.Match(cellName);

            return uint.Parse(match.Value);
        }

        # endregion


        private static IDictionary<string, string> _mappings = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase) {
            {".323", "text/h323"},
            {".3g2", "video/3gpp2"},
            {".3gp", "video/3gpp"},
            {".3gp2", "video/3gpp2"},
            {".3gpp", "video/3gpp"},
            {".7z", "application/x-7z-compressed"},
            {".aa", "audio/audible"},
            {".AAC", "audio/aac"},
            {".aaf", "application/octet-stream"},
            {".aax", "audio/vnd.audible.aax"},
            {".ac3", "audio/ac3"},
            {".aca", "application/octet-stream"},
            {".accda", "application/msaccess.addin"},
            {".accdb", "application/msaccess"},
            {".accdc", "application/msaccess.cab"},
            {".accde", "application/msaccess"},
            {".accdr", "application/msaccess.runtime"},
            {".accdt", "application/msaccess"},
            {".accdw", "application/msaccess.webapplication"},
            {".accft", "application/msaccess.ftemplate"},
            {".acx", "application/internet-property-stream"},
            {".AddIn", "text/xml"},
            {".ade", "application/msaccess"},
            {".adobebridge", "application/x-bridge-url"},
            {".adp", "application/msaccess"},
            {".ADT", "audio/vnd.dlna.adts"},
            {".ADTS", "audio/aac"},
            {".afm", "application/octet-stream"},
            {".ai", "application/postscript"},
            {".aif", "audio/x-aiff"},
            {".aifc", "audio/aiff"},
            {".aiff", "audio/aiff"},
            {".air", "application/vnd.adobe.air-application-installer-package+zip"},
            {".amc", "application/x-mpeg"},
            {".application", "application/x-ms-application"},
            {".art", "image/x-jg"},
            {".asa", "application/xml"},
            {".asax", "application/xml"},
            {".ascx", "application/xml"},
            {".asd", "application/octet-stream"},
            {".asf", "video/x-ms-asf"},
            {".ashx", "application/xml"},
            {".asi", "application/octet-stream"},
            {".asm", "text/plain"},
            {".asmx", "application/xml"},
            {".aspx", "application/xml"},
            {".asr", "video/x-ms-asf"},
            {".asx", "video/x-ms-asf"},
            {".atom", "application/atom+xml"},
            {".au", "audio/basic"},
            {".avi", "video/x-msvideo"},
            {".axs", "application/olescript"},
            {".bas", "text/plain"},
            {".bcpio", "application/x-bcpio"},
            {".bin", "application/octet-stream"},
            {".bmp", "image/bmp"},
            {".c", "text/plain"},
            {".cab", "application/octet-stream"},
            {".caf", "audio/x-caf"},
            {".calx", "application/vnd.ms-office.calx"},
            {".cat", "application/vnd.ms-pki.seccat"},
            {".cc", "text/plain"},
            {".cd", "text/plain"},
            {".cdda", "audio/aiff"},
            {".cdf", "application/x-cdf"},
            {".cer", "application/x-x509-ca-cert"},
            {".chm", "application/octet-stream"},
            {".class", "application/x-java-applet"},
            {".clp", "application/x-msclip"},
            {".cmx", "image/x-cmx"},
            {".cnf", "text/plain"},
            {".cod", "image/cis-cod"},
            {".config", "application/xml"},
            {".contact", "text/x-ms-contact"},
            {".coverage", "application/xml"},
            {".cpio", "application/x-cpio"},
            {".cpp", "text/plain"},
            {".crd", "application/x-mscardfile"},
            {".crl", "application/pkix-crl"},
            {".crt", "application/x-x509-ca-cert"},
            {".cs", "text/plain"},
            {".csdproj", "text/plain"},
            {".csh", "application/x-csh"},
            {".csproj", "text/plain"},
            {".css", "text/css"},
            {".csv", "text/csv"},
            {".cur", "application/octet-stream"},
            {".cxx", "text/plain"},
            {".dat", "application/octet-stream"},
            {".datasource", "application/xml"},
            {".dbproj", "text/plain"},
            {".dcr", "application/x-director"},
            {".def", "text/plain"},
            {".deploy", "application/octet-stream"},
            {".der", "application/x-x509-ca-cert"},
            {".dgml", "application/xml"},
            {".dib", "image/bmp"},
            {".dif", "video/x-dv"},
            {".dir", "application/x-director"},
            {".disco", "text/xml"},
            {".dll", "application/x-msdownload"},
            {".dll.config", "text/xml"},
            {".dlm", "text/dlm"},
            {".doc", "application/msword"},
            {".docm", "application/vnd.ms-word.document.macroEnabled.12"},
            {".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
            {".dot", "application/msword"},
            {".dotm", "application/vnd.ms-word.template.macroEnabled.12"},
            {".dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"},
            {".dsp", "application/octet-stream"},
            {".dsw", "text/plain"},
            {".dtd", "text/xml"},
            {".dtsConfig", "text/xml"},
            {".dv", "video/x-dv"},
            {".dvi", "application/x-dvi"},
            {".dwf", "drawing/x-dwf"},
            {".dwp", "application/octet-stream"},
            {".dxr", "application/x-director"},
            {".eml", "message/rfc822"},
            {".emz", "application/octet-stream"},
            {".eot", "application/octet-stream"},
            {".eps", "application/postscript"},
            {".etl", "application/etl"},
            {".etx", "text/x-setext"},
            {".evy", "application/envoy"},
            {".exe", "application/octet-stream"},
            {".exe.config", "text/xml"},
            {".fdf", "application/vnd.fdf"},
            {".fif", "application/fractals"},
            {".filters", "Application/xml"},
            {".fla", "application/octet-stream"},
            {".flr", "x-world/x-vrml"},
            {".flv", "video/x-flv"},
            {".fsscript", "application/fsharp-script"},
            {".fsx", "application/fsharp-script"},
            {".generictest", "application/xml"},
            {".gif", "image/gif"},
            {".group", "text/x-ms-group"},
            {".gsm", "audio/x-gsm"},
            {".gtar", "application/x-gtar"},
            {".gz", "application/x-gzip"},
            {".h", "text/plain"},
            {".hdf", "application/x-hdf"},
            {".hdml", "text/x-hdml"},
            {".hhc", "application/x-oleobject"},
            {".hhk", "application/octet-stream"},
            {".hhp", "application/octet-stream"},
            {".hlp", "application/winhlp"},
            {".hpp", "text/plain"},
            {".hqx", "application/mac-binhex40"},
            {".hta", "application/hta"},
            {".htc", "text/x-component"},
            {".htm", "text/html"},
            {".html", "text/html"},
            {".htt", "text/webviewhtml"},
            {".hxa", "application/xml"},
            {".hxc", "application/xml"},
            {".hxd", "application/octet-stream"},
            {".hxe", "application/xml"},
            {".hxf", "application/xml"},
            {".hxh", "application/octet-stream"},
            {".hxi", "application/octet-stream"},
            {".hxk", "application/xml"},
            {".hxq", "application/octet-stream"},
            {".hxr", "application/octet-stream"},
            {".hxs", "application/octet-stream"},
            {".hxt", "text/html"},
            {".hxv", "application/xml"},
            {".hxw", "application/octet-stream"},
            {".hxx", "text/plain"},
            {".i", "text/plain"},
            {".ico", "image/x-icon"},
            {".ics", "application/octet-stream"},
            {".idl", "text/plain"},
            {".ief", "image/ief"},
            {".iii", "application/x-iphone"},
            {".inc", "text/plain"},
            {".inf", "application/octet-stream"},
            {".inl", "text/plain"},
            {".ins", "application/x-internet-signup"},
            {".ipa", "application/x-itunes-ipa"},
            {".ipg", "application/x-itunes-ipg"},
            {".ipproj", "text/plain"},
            {".ipsw", "application/x-itunes-ipsw"},
            {".iqy", "text/x-ms-iqy"},
            {".isp", "application/x-internet-signup"},
            {".ite", "application/x-itunes-ite"},
            {".itlp", "application/x-itunes-itlp"},
            {".itms", "application/x-itunes-itms"},
            {".itpc", "application/x-itunes-itpc"},
            {".IVF", "video/x-ivf"},
            {".jar", "application/java-archive"},
            {".java", "application/octet-stream"},
            {".jck", "application/liquidmotion"},
            {".jcz", "application/liquidmotion"},
            {".jfif", "image/pjpeg"},
            {".jnlp", "application/x-java-jnlp-file"},
            {".jpb", "application/octet-stream"},
            {".jpe", "image/jpeg"},
            {".jpeg", "image/jpeg"},
            {".jpg", "image/jpeg"},
            {".js", "application/x-javascript"},
            {".json", "application/json"},
            {".jsx", "text/jscript"},
            {".jsxbin", "text/plain"},
            {".latex", "application/x-latex"},
            {".library-ms", "application/windows-library+xml"},
            {".lit", "application/x-ms-reader"},
            {".loadtest", "application/xml"},
            {".lpk", "application/octet-stream"},
            {".lsf", "video/x-la-asf"},
            {".lst", "text/plain"},
            {".lsx", "video/x-la-asf"},
            {".lzh", "application/octet-stream"},
            {".m13", "application/x-msmediaview"},
            {".m14", "application/x-msmediaview"},
            {".m1v", "video/mpeg"},
            {".m2t", "video/vnd.dlna.mpeg-tts"},
            {".m2ts", "video/vnd.dlna.mpeg-tts"},
            {".m2v", "video/mpeg"},
            {".m3u", "audio/x-mpegurl"},
            {".m3u8", "audio/x-mpegurl"},
            {".m4a", "audio/m4a"},
            {".m4b", "audio/m4b"},
            {".m4p", "audio/m4p"},
            {".m4r", "audio/x-m4r"},
            {".m4v", "video/x-m4v"},
            {".mac", "image/x-macpaint"},
            {".mak", "text/plain"},
            {".man", "application/x-troff-man"},
            {".manifest", "application/x-ms-manifest"},
            {".map", "text/plain"},
            {".master", "application/xml"},
            {".mda", "application/msaccess"},
            {".mdb", "application/x-msaccess"},
            {".mde", "application/msaccess"},
            {".mdp", "application/octet-stream"},
            {".me", "application/x-troff-me"},
            {".mfp", "application/x-shockwave-flash"},
            {".mht", "message/rfc822"},
            {".mhtml", "message/rfc822"},
            {".mid", "audio/mid"},
            {".midi", "audio/mid"},
            {".mix", "application/octet-stream"},
            {".mk", "text/plain"},
            {".mmf", "application/x-smaf"},
            {".mno", "text/xml"},
            {".mny", "application/x-msmoney"},
            {".mod", "video/mpeg"},
            {".mov", "video/quicktime"},
            {".movie", "video/x-sgi-movie"},
            {".mp2", "video/mpeg"},
            {".mp2v", "video/mpeg"},
            {".mp3", "audio/mpeg"},
            {".mp4", "video/mp4"},
            {".mp4v", "video/mp4"},
            {".mpa", "video/mpeg"},
            {".mpe", "video/mpeg"},
            {".mpeg", "video/mpeg"},
            {".mpf", "application/vnd.ms-mediapackage"},
            {".mpg", "video/mpeg"},
            {".mpp", "application/vnd.ms-project"},
            {".mpv2", "video/mpeg"},
            {".mqv", "video/quicktime"},
            {".ms", "application/x-troff-ms"},
            {".msi", "application/octet-stream"},
            {".mso", "application/octet-stream"},
            {".mts", "video/vnd.dlna.mpeg-tts"},
            {".mtx", "application/xml"},
            {".mvb", "application/x-msmediaview"},
            {".mvc", "application/x-miva-compiled"},
            {".mxp", "application/x-mmxp"},
            {".nc", "application/x-netcdf"},
            {".nsc", "video/x-ms-asf"},
            {".nws", "message/rfc822"},
            {".ocx", "application/octet-stream"},
            {".oda", "application/oda"},
            {".odc", "text/x-ms-odc"},
            {".odh", "text/plain"},
            {".odl", "text/plain"},
            {".odp", "application/vnd.oasis.opendocument.presentation"},
            {".ods", "application/oleobject"},
            {".odt", "application/vnd.oasis.opendocument.text"},
            {".one", "application/onenote"},
            {".onea", "application/onenote"},
            {".onepkg", "application/onenote"},
            {".onetmp", "application/onenote"},
            {".onetoc", "application/onenote"},
            {".onetoc2", "application/onenote"},
            {".orderedtest", "application/xml"},
            {".osdx", "application/opensearchdescription+xml"},
            {".p10", "application/pkcs10"},
            {".p12", "application/x-pkcs12"},
            {".p7b", "application/x-pkcs7-certificates"},
            {".p7c", "application/pkcs7-mime"},
            {".p7m", "application/pkcs7-mime"},
            {".p7r", "application/x-pkcs7-certreqresp"},
            {".p7s", "application/pkcs7-signature"},
            {".pbm", "image/x-portable-bitmap"},
            {".pcast", "application/x-podcast"},
            {".pct", "image/pict"},
            {".pcx", "application/octet-stream"},
            {".pcz", "application/octet-stream"},
            {".pdf", "application/pdf"},
            {".pfb", "application/octet-stream"},
            {".pfm", "application/octet-stream"},
            {".pfx", "application/x-pkcs12"},
            {".pgm", "image/x-portable-graymap"},
            {".pic", "image/pict"},
            {".pict", "image/pict"},
            {".pkgdef", "text/plain"},
            {".pkgundef", "text/plain"},
            {".pko", "application/vnd.ms-pki.pko"},
            {".pls", "audio/scpls"},
            {".pma", "application/x-perfmon"},
            {".pmc", "application/x-perfmon"},
            {".pml", "application/x-perfmon"},
            {".pmr", "application/x-perfmon"},
            {".pmw", "application/x-perfmon"},
            {".png", "image/png"},
            {".pnm", "image/x-portable-anymap"},
            {".pnt", "image/x-macpaint"},
            {".pntg", "image/x-macpaint"},
            {".pnz", "image/png"},
            {".pot", "application/vnd.ms-powerpoint"},
            {".potm", "application/vnd.ms-powerpoint.template.macroEnabled.12"},
            {".potx", "application/vnd.openxmlformats-officedocument.presentationml.template"},
            {".ppa", "application/vnd.ms-powerpoint"},
            {".ppam", "application/vnd.ms-powerpoint.addin.macroEnabled.12"},
            {".ppm", "image/x-portable-pixmap"},
            {".pps", "application/vnd.ms-powerpoint"},
            {".ppsm", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"},
            {".ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"},
            {".ppt", "application/vnd.ms-powerpoint"},
            {".pptm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12"},
            {".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
            {".prf", "application/pics-rules"},
            {".prm", "application/octet-stream"},
            {".prx", "application/octet-stream"},
            {".ps", "application/postscript"},
            {".psc1", "application/PowerShell"},
            {".psd", "application/octet-stream"},
            {".psess", "application/xml"},
            {".psm", "application/octet-stream"},
            {".psp", "application/octet-stream"},
            {".pub", "application/x-mspublisher"},
            {".pwz", "application/vnd.ms-powerpoint"},
            {".qht", "text/x-html-insertion"},
            {".qhtm", "text/x-html-insertion"},
            {".qt", "video/quicktime"},
            {".qti", "image/x-quicktime"},
            {".qtif", "image/x-quicktime"},
            {".qtl", "application/x-quicktimeplayer"},
            {".qxd", "application/octet-stream"},
            {".ra", "audio/x-pn-realaudio"},
            {".ram", "audio/x-pn-realaudio"},
            {".rar", "application/octet-stream"},
            {".ras", "image/x-cmu-raster"},
            {".rat", "application/rat-file"},
            {".rc", "text/plain"},
            {".rc2", "text/plain"},
            {".rct", "text/plain"},
            {".rdlc", "application/xml"},
            {".resx", "application/xml"},
            {".rf", "image/vnd.rn-realflash"},
            {".rgb", "image/x-rgb"},
            {".rgs", "text/plain"},
            {".rm", "application/vnd.rn-realmedia"},
            {".rmi", "audio/mid"},
            {".rmp", "application/vnd.rn-rn_music_package"},
            {".roff", "application/x-troff"},
            {".rpm", "audio/x-pn-realaudio-plugin"},
            {".rqy", "text/x-ms-rqy"},
            {".rtf", "application/rtf"},
            {".rtx", "text/richtext"},
            {".ruleset", "application/xml"},
            {".s", "text/plain"},
            {".safariextz", "application/x-safari-safariextz"},
            {".scd", "application/x-msschedule"},
            {".sct", "text/scriptlet"},
            {".sd2", "audio/x-sd2"},
            {".sdp", "application/sdp"},
            {".sea", "application/octet-stream"},
            {".searchConnector-ms", "application/windows-search-connector+xml"},
            {".setpay", "application/set-payment-initiation"},
            {".setreg", "application/set-registration-initiation"},
            {".settings", "application/xml"},
            {".sgimb", "application/x-sgimb"},
            {".sgml", "text/sgml"},
            {".sh", "application/x-sh"},
            {".shar", "application/x-shar"},
            {".shtml", "text/html"},
            {".sit", "application/x-stuffit"},
            {".sitemap", "application/xml"},
            {".skin", "application/xml"},
            {".sldm", "application/vnd.ms-powerpoint.slide.macroEnabled.12"},
            {".sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"},
            {".slk", "application/vnd.ms-excel"},
            {".sln", "text/plain"},
            {".slupkg-ms", "application/x-ms-license"},
            {".smd", "audio/x-smd"},
            {".smi", "application/octet-stream"},
            {".smx", "audio/x-smd"},
            {".smz", "audio/x-smd"},
            {".snd", "audio/basic"},
            {".snippet", "application/xml"},
            {".snp", "application/octet-stream"},
            {".sol", "text/plain"},
            {".sor", "text/plain"},
            {".spc", "application/x-pkcs7-certificates"},
            {".spl", "application/futuresplash"},
            {".src", "application/x-wais-source"},
            {".srf", "text/plain"},
            {".SSISDeploymentManifest", "text/xml"},
            {".ssm", "application/streamingmedia"},
            {".sst", "application/vnd.ms-pki.certstore"},
            {".stl", "application/vnd.ms-pki.stl"},
            {".sv4cpio", "application/x-sv4cpio"},
            {".sv4crc", "application/x-sv4crc"},
            {".svc", "application/xml"},
            {".swf", "application/x-shockwave-flash"},
            {".t", "application/x-troff"},
            {".tar", "application/x-tar"},
            {".tcl", "application/x-tcl"},
            {".testrunconfig", "application/xml"},
            {".testsettings", "application/xml"},
            {".tex", "application/x-tex"},
            {".texi", "application/x-texinfo"},
            {".texinfo", "application/x-texinfo"},
            {".tgz", "application/x-compressed"},
            {".thmx", "application/vnd.ms-officetheme"},
            {".thn", "application/octet-stream"},
            {".tif", "image/tiff"},
            {".tiff", "image/tiff"},
            {".tlh", "text/plain"},
            {".tli", "text/plain"},
            {".toc", "application/octet-stream"},
            {".tr", "application/x-troff"},
            {".trm", "application/x-msterminal"},
            {".trx", "application/xml"},
            {".ts", "video/vnd.dlna.mpeg-tts"},
            {".tsv", "text/tab-separated-values"},
            {".ttf", "application/octet-stream"},
            {".tts", "video/vnd.dlna.mpeg-tts"},
            {".txt", "text/plain"},
            {".u32", "application/octet-stream"},
            {".uls", "text/iuls"},
            {".user", "text/plain"},
            {".ustar", "application/x-ustar"},
            {".vb", "text/plain"},
            {".vbdproj", "text/plain"},
            {".vbk", "video/mpeg"},
            {".vbproj", "text/plain"},
            {".vbs", "text/vbscript"},
            {".vcf", "text/x-vcard"},
            {".vcproj", "Application/xml"},
            {".vcs", "text/plain"},
            {".vcxproj", "Application/xml"},
            {".vddproj", "text/plain"},
            {".vdp", "text/plain"},
            {".vdproj", "text/plain"},
            {".vdx", "application/vnd.ms-visio.viewer"},
            {".vml", "text/xml"},
            {".vscontent", "application/xml"},
            {".vsct", "text/xml"},
            {".vsd", "application/vnd.visio"},
            {".vsi", "application/ms-vsi"},
            {".vsix", "application/vsix"},
            {".vsixlangpack", "text/xml"},
            {".vsixmanifest", "text/xml"},
            {".vsmdi", "application/xml"},
            {".vspscc", "text/plain"},
            {".vss", "application/vnd.visio"},
            {".vsscc", "text/plain"},
            {".vssettings", "text/xml"},
            {".vssscc", "text/plain"},
            {".vst", "application/vnd.visio"},
            {".vstemplate", "text/xml"},
            {".vsto", "application/x-ms-vsto"},
            {".vsw", "application/vnd.visio"},
            {".vsx", "application/vnd.visio"},
            {".vtx", "application/vnd.visio"},
            {".wav", "audio/wav"},
            {".wave", "audio/wav"},
            {".wax", "audio/x-ms-wax"},
            {".wbk", "application/msword"},
            {".wbmp", "image/vnd.wap.wbmp"},
            {".wcm", "application/vnd.ms-works"},
            {".wdb", "application/vnd.ms-works"},
            {".wdp", "image/vnd.ms-photo"},
            {".webarchive", "application/x-safari-webarchive"},
            {".webtest", "application/xml"},
            {".wiq", "application/xml"},
            {".wiz", "application/msword"},
            {".wks", "application/vnd.ms-works"},
            {".WLMP", "application/wlmoviemaker"},
            {".wlpginstall", "application/x-wlpg-detect"},
            {".wlpginstall3", "application/x-wlpg3-detect"},
            {".wm", "video/x-ms-wm"},
            {".wma", "audio/x-ms-wma"},
            {".wmd", "application/x-ms-wmd"},
            {".wmf", "application/x-msmetafile"},
            {".wml", "text/vnd.wap.wml"},
            {".wmlc", "application/vnd.wap.wmlc"},
            {".wmls", "text/vnd.wap.wmlscript"},
            {".wmlsc", "application/vnd.wap.wmlscriptc"},
            {".wmp", "video/x-ms-wmp"},
            {".wmv", "video/x-ms-wmv"},
            {".wmx", "video/x-ms-wmx"},
            {".wmz", "application/x-ms-wmz"},
            {".wpl", "application/vnd.ms-wpl"},
            {".wps", "application/vnd.ms-works"},
            {".wri", "application/x-mswrite"},
            {".wrl", "x-world/x-vrml"},
            {".wrz", "x-world/x-vrml"},
            {".wsc", "text/scriptlet"},
            {".wsdl", "text/xml"},
            {".wvx", "video/x-ms-wvx"},
            {".x", "application/directx"},
            {".xaf", "x-world/x-vrml"},
            {".xaml", "application/xaml+xml"},
            {".xap", "application/x-silverlight-app"},
            {".xbap", "application/x-ms-xbap"},
            {".xbm", "image/x-xbitmap"},
            {".xdr", "text/plain"},
            {".xht", "application/xhtml+xml"},
            {".xhtml", "application/xhtml+xml"},
            {".xla", "application/vnd.ms-excel"},
            {".xlam", "application/vnd.ms-excel.addin.macroEnabled.12"},
            {".xlc", "application/vnd.ms-excel"},
            {".xld", "application/vnd.ms-excel"},
            {".xlk", "application/vnd.ms-excel"},
            {".xll", "application/vnd.ms-excel"},
            {".xlm", "application/vnd.ms-excel"},
            {".xls", "application/vnd.ms-excel"},
            {".xlsb", "application/vnd.ms-excel.sheet.binary.macroEnabled.12"},
            {".xlsm", "application/vnd.ms-excel.sheet.macroEnabled.12"},
            {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
            {".xlt", "application/vnd.ms-excel"},
            {".xltm", "application/vnd.ms-excel.template.macroEnabled.12"},
            {".xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"},
            {".xlw", "application/vnd.ms-excel"},
            {".xml", "text/xml"},
            {".xmta", "application/xml"},
            {".xof", "x-world/x-vrml"},
            {".XOML", "text/plain"},
            {".xpm", "image/x-xpixmap"},
            {".xps", "application/vnd.ms-xpsdocument"},
            {".xrm-ms", "text/xml"},
            {".xsc", "application/xml"},
            {".xsd", "text/xml"},
            {".xsf", "text/xml"},
            {".xsl", "text/xml"},
            {".xslt", "text/xml"},
            {".xsn", "application/octet-stream"},
            {".xss", "application/xml"},
            {".xtp", "application/octet-stream"},
            {".xwd", "image/x-xwindowdump"},
            {".z", "application/x-compress"},
            {".zip", "application/x-zip-compressed"}};
    }

    public enum ExcelReportHeaderRowOption
    {
        None = 0,
        CreatFromColumnCaption = 1,
    }

    public enum DataTableExtendedProperties
    {
        CellNumberFormat = 0
    }

    public class ExcelColumnProperties
    {
        public XLDataType DataType { get; set; }
        public string CellNumberFormat { get; set; }
    }
}
