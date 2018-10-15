using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;
using Spring.Context;
using Spring.Context.Support;
using Ser.Log4net;

namespace Ser.Spring.Bootstrap {
    public class SpringBootstrapperImpl : SpringBootstrapper {

        public ILog Logger { set; get; }
        public bool IsDone { private set; get; }
        public string XmlFile { set; private get; }
        public IApplicationContext Ctx { private set; get; }


        public void BootstrapStandard() {

            Logger.Debug("Bootstrapping Spring.NET...");
            Ctx = ContextRegistry.GetContext();

            Logger.Debug("Setting object loggers.");
            LoggerSetter loggerSetter = (LoggerSetter)Ctx.GetObject("LoggerSetter");
            loggerSetter.SetLoggers();

            Logger.Debug("Bootstrapping Spring.NET - Done.");
            IsDone = true;
        }

        public void Bootstrap() {

            Logger.Debug("Bootstrapping Spring.NET...");
            if (XmlFile == null) {
                Ctx = ContextRegistry.GetContext();
            }
            else {
                Ctx = new XmlApplicationContext(XmlFile);
            }

            //Logger.Debug("Setting object loggers.");
            //LoggerSetter loggerSetter = (LoggerSetter)Ctx.GetObject("LoggerSetter");
            //loggerSetter.SetLoggers();

            Logger.Debug("Bootstrapping Spring.NET - Done.");
            IsDone = true;
        }
    }
}
