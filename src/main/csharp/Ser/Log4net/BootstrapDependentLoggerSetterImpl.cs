using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;
using Ser.Bootstrap;

namespace Ser.Log4net {
    public class BootstrapDependentLoggerSetterImpl : LoggerSetterImpl {

        public LogBootstrapper LogBootstrapper { set; get; }

        protected new void SetLogger(LoggerRecipient loggerRecipient) {
            if (LogBootstrapper.IsDone) {
                loggerRecipient.Logger = LogManager.GetLogger(loggerRecipient.GetType().FullName);
            }
        }
    }
}
