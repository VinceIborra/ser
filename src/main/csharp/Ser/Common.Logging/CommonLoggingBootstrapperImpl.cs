using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Common.Logging;
using Common.Logging.Configuration;
using Common.Logging.Log4Net;

namespace Ser.Common.Logging {
    public class CommonLoggingBootstrapperImpl : CommonLoggingBootstrapper {

        public bool IsDone { private set; get; }

        public void Bootstrap() {

            // Set Common.Logging adapter to use Log4Net
            NameValueCollection properties = new NameValueCollection();
            properties["configType"] = "EXTERNAL";
            LogManager.Adapter = new Log4NetLoggerFactoryAdapter(properties);
            IsDone = true;
        }
    }
}
