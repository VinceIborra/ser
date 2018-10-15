using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using Ser.Log4net;
using Ser.Bootstrap;
using Ser.Spring.Bootstrap;
using Ser.Common.Logging;


namespace Ser.Std.Bootstrap {
    public class BootstrapperFactoryImpl : BootstrapperFactory {

        public CommonLoggingBootstrapper NewCommonLoggingBootstrapper() {
            CommonLoggingBootstrapperImpl commonLoggingBootstrapper = new CommonLoggingBootstrapperImpl();
            return commonLoggingBootstrapper;
        }

        public LogBootstrapper NewLogBootstrapper(Assembly assembly, string assemblyName, string xmlCfgFPathFile) {
            LogBootstrapperImpl logBootstrapper = new LogBootstrapperImpl();
            logBootstrapper.CfgAssembly = assembly;
            logBootstrapper.CfgAssemblyName = assemblyName;
            logBootstrapper.XmlCfgPathFile = xmlCfgFPathFile;
            return logBootstrapper;
        }

        //public AssemblyResolver NewAssemblyResolver(LoggerSetter loggerSetter) {
        //    AssemblyResolverImpl assemblyResolver = new AssemblyResolverImpl();
        //    loggerSetter.Add(assemblyResolver);
        //    return assemblyResolver;
        //}

        public SpringBootstrapper NewSpringBootstrapper(LoggerSetter loggerSetter, string xmlFile = null) {
            SpringBootstrapperImpl springBootstrapper = new SpringBootstrapperImpl();
            springBootstrapper.XmlFile = xmlFile;
            loggerSetter.Add(springBootstrapper);
            return springBootstrapper;
        }

        public CompositeBootstrapper NewCompositeBootstrapper(LoggerSetter loggerSetter, IList<Bootstrapper> bootstrappers) {
            CompositeBootstrapperImpl compositeBootstrapper = new CompositeBootstrapperImpl();
            compositeBootstrapper.SubBootstrappers = bootstrappers;
            loggerSetter.Add(compositeBootstrapper);
            return compositeBootstrapper;
        }

        //public Runner NewSpringRunner(LoggerSetter loggerSetter, SpringBootstrapper springBootstrapper) {
        //    SpringRunnerImpl runner = new SpringRunnerImpl();
        //    runner.SpringBootstrapper = springBootstrapper;
        //    loggerSetter.Add(runner);
        //    return runner;
        //}
    }
}
