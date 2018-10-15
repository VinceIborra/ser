using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ser.Bootstrap;

namespace Ser.Log4net {
    public interface Log4netFactory {
        LoggerSetter NewLoggerSetter();
        LoggerSetter NewBootstrapDependentLoggerSetter(LogBootstrapper logBootstrapper);
    }
}
