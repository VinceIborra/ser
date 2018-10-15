using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ser.Log4net;

namespace Ser.Bootstrap {
    public interface CompositeBootstrapper : Bootstrapper, LoggerRecipient {
    }
}
