using System;

namespace ETS.Jobs.Request
{
    public abstract class AbstractRequest
    {
        public Guid RequestId { get; set; }

        protected AbstractRequest()
        {
            RequestId = Guid.NewGuid();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public virtual string GetRequestString()
        {
            return GetType().Name;
        }
    }
}
