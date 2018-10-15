using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Reflection;

using log4net;
using log4net.Config;
using Ser.Log4net;

namespace Ser.Bootstrap {
    public class LogBootstrapperImpl : LogBootstrapper, LoggerRecipient {

        public ILog Logger { set; get; } = null;
        public bool IsDone { private set; get; } = false;
        public Assembly CfgAssembly { set; private get; } = null;
        public string CfgAssemblyName { set; private get; } = null;
        public string XmlCfgPathFile { set; private get; } = null;

        public void BootstrapStandard() {   
            XmlConfigurator.Configure();
            Logger = LogManager.GetLogger(typeof(LogBootstrapperImpl));
            Logger.Debug("Logging bootstrapped.");
            IsDone = true;
        }

        private void AssertAssemblyLoadedSuccessfully(string assemblyName) {
            if (CfgAssembly == null) {
                throw new AssemblyNotLoadedException("Assembly " + assemblyName + " has not been loaded successfully");
            }
        }

        //AssemblyEmbeddedCfgUnreachableException
        private void AssertAssemblyEmbeddedCfgReachable(Stream stream, Assembly assembly, string file) {
            if (stream == null) {
                throw new AssemblyEmbeddedCfgUnreachableException("The assembly embedded file " + file + " in assembly " + assembly.FullName + " could not be reached");
            }
        }

        // Case 1 - Config file in an assembly and assembly not passed
        // Case 2 - Config file in an assembly and assembly passed
        // Case 3 - Config file in file systems
        public void BootstrapUsingFile() {

            // Case 1 or Case 2
            if (CfgAssemblyName != null || CfgAssembly != null) {

                // Case 1 - Load the assembly 
                if (CfgAssemblyName != null && CfgAssembly == null) {
                    CfgAssembly = Assembly.Load(CfgAssemblyName);
                    AssertAssemblyLoadedSuccessfully(CfgAssemblyName);
                }

                // Case 1 & 2 - Get a stream for the embedded file
                Stream stream = CfgAssembly.GetManifestResourceStream(XmlCfgPathFile);
                AssertAssemblyEmbeddedCfgReachable(stream, CfgAssembly, XmlCfgPathFile);

                // And use it to configure Log4Net
                XmlConfigurator.Configure(stream);
            }

            // Case 3
            else {
                FileInfo fileInfo = new FileInfo(XmlCfgPathFile);
                XmlConfigurator.Configure(fileInfo);
            }

            // 

            Logger = LogManager.GetLogger(typeof(LogBootstrapperImpl));
            Logger.Debug("Logging bootstrapped.");
            IsDone = true;
        }

        public void Bootstrap() {
            if (XmlCfgPathFile != null) {
                BootstrapUsingFile();
            }
            else {
                BootstrapStandard();
            }
        }


    }
}