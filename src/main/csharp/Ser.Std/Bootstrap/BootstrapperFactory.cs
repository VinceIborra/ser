using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using Ser.Log4net;
using Ser.Spring.Bootstrap;
using Ser.Bootstrap;
using Ser.Common.Logging;

namespace Ser.Std.Bootstrap {
    public interface BootstrapperFactory {
        CommonLoggingBootstrapper NewCommonLoggingBootstrapper();
        LogBootstrapper NewLogBootstrapper(Assembly assembly, string assemblyName, string xmlCfgFPathFile);
        //AssemblyResolver NewAssemblyResolver(LoggerSetter loggerSetter);
        SpringBootstrapper NewSpringBootstrapper(LoggerSetter loggerSetter, string xmlFile = null);
        CompositeBootstrapper NewCompositeBootstrapper(LoggerSetter loggerSetter, IList<Bootstrapper> bootstrappers);
        //Runner NewSpringRunner(LoggerSetter loggerSetter, SpringBootstrapper springBootstrapper);
    }
}
