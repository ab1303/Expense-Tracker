using System;
using System.Collections.Generic;
using System.Text;

namespace ETS.Services.Results
{
    public class ServiceResult
    {
        private string _message;
        private ServiceStatus _status;

        public bool IsSuccess => Status == ServiceStatus.Success;

        public ServiceStatus Status
        {
            get => Exception == null ? _status : ServiceStatus.Error;
            set => _status = value;
        }

        public Exception Exception { get; set; }

        public string Message
        {
            get => _message ?? Exception?.Message;
            set => _message = value;
        }
    }

    public enum ServiceStatus
    {
        Error,
        Success,
    }
}
