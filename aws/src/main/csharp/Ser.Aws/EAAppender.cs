using System.Runtime.InteropServices;

using log4net.Core;
using log4net.Appender;

using EA;

namespace Ser.log4net.Appender {

    public class EAAppender : AppenderSkeleton {

        private string DEFAULT_OUTPUT_TAB_NAME = "Ser.Log";

        private App _app = null;

        private string _outputTabName = null;

        private App App {
            get {
                if (_app == null) {
                    _app = (App)Marshal.GetActiveObject("EA.App");
                }
                return _app;
            }
        }

        private Repository Repository {
            get {
                return this.App.Repository;
            }
        }

        public string OutputTabName {
            set {
                _outputTabName = value;
            }
            get {
                if (_outputTabName == null) {
                    _outputTabName = DEFAULT_OUTPUT_TAB_NAME;
                }
                return _outputTabName;
            }
        }

        public EAAppender() {
        }

        override protected void Append(LoggingEvent loggingEvent) {

            // Make sure the output tab is open and ready for loggin
            this.Repository.CreateOutputTab(this.OutputTabName);
            this.Repository.EnsureOutputVisible(this.OutputTabName);

            // Render the event to a string
            string outputStr = this.RenderLoggingEvent(loggingEvent);

            // And output
            this.Repository.WriteOutput(this.OutputTabName, outputStr, 1);
        }
    }
}
