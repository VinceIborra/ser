using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ser.Bootstrap;

namespace Ser.Log4net {
    public class Log4netFactoryImpl : Log4netFactory {

        public LoggerSetter NewLoggerSetter() {
            IList<LoggerRecipient> loggerRecipients = new List<LoggerRecipient>();
            LoggerSetterImpl loggerSetter = new LoggerSetterImpl();
            loggerSetter.LoggerRecipients = loggerRecipients;
            return loggerSetter;
        }

        public LoggerSetter NewBootstrapDependentLoggerSetter(LogBootstrapper logBootstrapper) {
            IList<LoggerRecipient> loggerRecipients = new List<LoggerRecipient>();
            BootstrapDependentLoggerSetterImpl loggerSetter = new BootstrapDependentLoggerSetterImpl();
            loggerSetter.LogBootstrapper = logBootstrapper;
            loggerSetter.LoggerRecipients = loggerRecipients;
            return loggerSetter;
        }
    }
}
