using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;
using Ser.Bootstrap;

namespace Ser.Log4net {
    public class LoggerSetterImpl : LoggerSetter {

        public bool IsDone { set; get; }
        public IList<LoggerRecipient> LoggerRecipients { set; get; }

        protected virtual void SetLogger(LoggerRecipient loggerRecipient) {
            loggerRecipient.Logger = LogManager.GetLogger(loggerRecipient.GetType().FullName);
        }

        public void Add(LoggerRecipient loggerRecipient) {
            LoggerRecipients.Add(loggerRecipient);
            SetLogger(loggerRecipient);
        }

        public void SetLoggers() {
            foreach (LoggerRecipient loggerRecipient in LoggerRecipients) {
                SetLogger(loggerRecipient);
            }
        }

        public void Bootstrap() {
            SetLoggers();
        }
    }
}
