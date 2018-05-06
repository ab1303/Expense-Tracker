using System.IO;
using System.Text;
using System.Threading.Tasks;
using Angular_ASPNETCore_ExpenseTracker.Infrastructure.Attributes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Angular_ASPNETCore_ExpenseTracker.Infrastructure;
using ETS.Core.Interfaces;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/Expenses")]
    public class ExpensesController : Controller
    {
        private readonly ILogger<ExpensesController> _logger;
        private readonly IFileStorage _fileStorage;

        // Get the default form options so that we can use them to set the default limits for
        // request body data
        private static readonly FormOptions _defaultFormOptions = new FormOptions();

        public ExpensesController(ILogger<ExpensesController> logger, IFileStorage fileStorage)
        {
            _logger = logger;
            this._fileStorage = fileStorage;
        }


        // 1. Disable the form value model binding here to take control of handling 
        //    potentially large files.
        // 2. Typically antiforgery tokens are sent in request body, but since we 
        //    do not want to read the request body early, the tokens are made to be 
        //    sent via headers. The antiforgery token filter first looks for tokens
        //    in the request header and then falls back to reading the body.
        [HttpPost("UploadFile")]
        [DisableFormValueModelBinding]
        //[ValidateAntiForgeryToken] // TODO:
        public async Task<IActionResult> UploadFile()
        {
            if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
            {
                return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
            }


            string uploadedFileUri = null;

            var boundary = MultipartRequestHelper.GetBoundary(
                MediaTypeHeaderValue.Parse(Request.ContentType),
                _defaultFormOptions.MultipartBoundaryLengthLimit);
            var reader = new MultipartReader(boundary, HttpContext.Request.Body);

            var section = await reader.ReadNextSectionAsync();
            while (section != null)
            {
                ContentDispositionHeaderValue contentDisposition;
                var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out contentDisposition);

                if (hasContentDispositionHeader)
                {
                    if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                    {
                        // Upload file to Azure Storage
                        using (var targetStream = new MemoryStream())
                        {
                            await section.Body.CopyToAsync(targetStream);

                            uploadedFileUri = _fileStorage.StoreFile(
                                ETS.Core.Enums.FileFolder.MonthlyExpenseSheets,
                                HeaderUtilities.RemoveQuotes(contentDisposition.FileName).ToString(),
                                targetStream.ToArray());

                            _logger.LogInformation($"Copied the uploaded file '{uploadedFileUri}'");
                        }

                    }
                }

                // Drains any remaining section body that has not been consumed and
                // reads the headers for the next section.
                section = await reader.ReadNextSectionAsync();
            }

            return Json(new
            {
                fileUri = uploadedFileUri,
            });
        }

        private static Encoding GetEncoding(MultipartSection section)
        {
            MediaTypeHeaderValue mediaType;
            var hasMediaTypeHeader = MediaTypeHeaderValue.TryParse(section.ContentType, out mediaType);
            // UTF-7 is insecure and should not be honored. UTF-8 will succeed in 
            // most cases.
            if (!hasMediaTypeHeader || Encoding.UTF7.Equals(mediaType.Encoding))
            {
                return Encoding.UTF8;
            }
            return mediaType.Encoding;
        }
    }
}