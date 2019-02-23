using System;
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
using ETS.Jobs.Request;
using Hangfire;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/Expenses")]
    public class ExpensesController : Controller
    {
        private readonly ILogger<ExpensesController> _logger;
        private readonly IFileStorage _fileStorage;
        private readonly IBackgroundJobClient _backgroundJobClient;

        // Get the default form options so that we can use them to set the default limits for
        // request body data
        private static readonly FormOptions _defaultFormOptions = new FormOptions();

        public ExpensesController(ILogger<ExpensesController> logger, IFileStorage fileStorage, IBackgroundJobClient backgroundJobClient)
        {
            _logger = logger;
            _fileStorage = fileStorage;
            _backgroundJobClient = backgroundJobClient;
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
        public async Task<JsonResult> UploadFile(IFormFile fileAttachment)
        {
            if (fileAttachment == null) throw new ArgumentNullException(nameof(fileAttachment));

            string uploadedFileUri;
            using (var reader = new StreamReader(fileAttachment.OpenReadStream()))
            {
                var targetStream = new MemoryStream();
                await reader.BaseStream.CopyToAsync(targetStream);

                var parsedContentDisposition = ContentDispositionHeaderValue.Parse(fileAttachment.ContentDisposition);
                var fileName = parsedContentDisposition.FileName.ToString();

                uploadedFileUri = await _fileStorage.StoreFileAsync(
                    ETS.Core.Enums.FileFolder.MonthlyExpenseSheets,
                    fileName, targetStream.ToArray());

                _logger.LogInformation($"Copied the uploaded fileAttachment '{uploadedFileUri}'");

                var uri = uploadedFileUri;
                _backgroundJobClient.Enqueue<IProcessMonthlyExpenseFileUploadRequest>(
                    x => x.Handle(
                        new ProcessMonthlyExpenseFileUploadRequest
                        {
                            FileUri = uri,
                            FileName = fileName
                        }));
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