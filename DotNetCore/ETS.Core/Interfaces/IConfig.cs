namespace ETS.Core.Interfaces
{
    public interface IConfig
    {
        string SiteName { get; }
        bool SSL { get; }
        string Host { get; }
        int Port { get; }
        string RootUrl { get; }
        int DefaultAccountLockoutTimeSpan { get; }
        int MaxFailedAccessAttemptsBeforeLockout { get; }
    }
}
