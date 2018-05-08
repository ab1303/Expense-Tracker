using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace ETS.Core.Interfaces
{
    public interface ILogProvider
    {
        void LogInformation(string message, params object[] args);
        void LogInformation(string message);

        void LogWarning(string message, params object[] args);
        void LogWarning(string message);

        void LogError(string message, params object[] args);
        void LogError(string message);
    }

    public static class LogProvider
    {
        #region Default implementation
        private class Default : ILogProvider
        {
            void ILogProvider.LogInformation(string message, params object[] args)
            {
                LogInformation(string.Format(message, args));
            }

            void ILogProvider.LogInformation(string message)
            {
                Log(LogType.Information, message);
            }

            void ILogProvider.LogWarning(string message, params object[] args)
            {
                LogWarning(string.Format(message, args));
            }

            void ILogProvider.LogWarning(string message)
            {
                Log(LogType.Warning, message);
            }

            void ILogProvider.LogError(string message, params object[] args)
            {
                LogError(string.Format(message, args));
            }

            void ILogProvider.LogError(string message)
            {
                Log(LogType.Error, message);
            }

            private void Log(LogType logType, string message)
            {
                switch (logType)
                {
                    case LogType.Information:
                        Trace.TraceInformation(message);
                        break;

                    case LogType.Warning:
                        Trace.TraceWarning(message);
                        break;

                    case LogType.Error:
                        Trace.TraceError(message);
                        break;

                    default:
                        throw new ArgumentOutOfRangeException(nameof(logType), logType, null);
                }
                Trace.Flush();
            }

            private enum LogType
            {
                Information,
                Warning,
                Error
            }
        }
        #endregion

        private static readonly IDictionary<string, ILogProvider> Providers = new Dictionary<string, ILogProvider> { { "Default", new Default() } };

        public static string AddProvider(ILogProvider provider)
        {
            var key = Guid.NewGuid().ToString();
            Providers.Add(key, provider);
            return key;
        }

        public static void RemoveProvider(string key)
        {
            if (Providers.ContainsKey(key))
                Providers.Remove(key);
        }

        public static void LogInformation(string message, params object[] args)
        {
            LogInformation(string.Format(message, args));
        }

        public static void LogInformation(string message)
        {
            foreach (var provider in Providers)
            {
                provider.Value.LogInformation(message);
            }
        }

        public static void LogWarning(string message, params object[] args)
        {
            LogWarning(string.Format(message, args));
        }

        public static void LogWarning(string message)
        {
            foreach (var provider in Providers)
            {
                provider.Value.LogWarning(message);
            }
        }

        public static void LogError(string message, params object[] args)
        {
            LogError(string.Format(message, args));
        }

        public static void LogError(string message)
        {
            foreach (var provider in Providers)
            {
                provider.Value.LogError(message);
            }
        }
    }
}
