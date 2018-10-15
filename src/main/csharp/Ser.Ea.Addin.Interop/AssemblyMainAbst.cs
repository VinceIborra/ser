using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

using Common.Logging;
using Common.Logging.Configuration;
using Common.Logging.Log4Net;

using EA;

using Ser.Bootstrap;
using Ser.Log4net;
using Ser.Spring.Bootstrap;
using Ser.Std.Bootstrap;
using Ser.Ea.Addin;
using Ser.Common.Logging;

namespace Ser.Ea.Addin.Interop {

    abstract public class AssemblyMainAbst : AssemblyMain {

        protected string SpringContextPathFile { set; get; } = null;
        protected Assembly Log4NetAssembly { set; get; } = null;
        protected string Log4NetAssemblyName { set; get; } = null;
        protected string Log4NetXmlCfgFPathFile { set; get; } = null;

        private bool IsBootstrappingDone { set; get; } = false;

        public AddinMain AddinMain { private set; get; } = null;

        /// <summary>
        /// Todo
        /// </summary>
        private void BootstrapAssembly() {

            // Get a way to create the top level objects
            Log4netFactory log4netFactory = new Log4netFactoryImpl();
            BootstrapperFactory bootstrapperFactory = new BootstrapperFactoryImpl();

            // Initialise the individual bootstrappers
            CommonLoggingBootstrapper commonLoggingBootstrapper = bootstrapperFactory.NewCommonLoggingBootstrapper();
            LogBootstrapper logBootstrapper = bootstrapperFactory.NewLogBootstrapper(Log4NetAssembly, Log4NetAssemblyName, Log4NetXmlCfgFPathFile);
            LoggerSetter loggerSetter = log4netFactory.NewBootstrapDependentLoggerSetter(logBootstrapper);
            //AssemblyResolver assemblyResolver = bootstrapperFactory.NewAssemblyResolver(loggerSetter);
            SpringBootstrapper springBootstrapper = bootstrapperFactory.NewSpringBootstrapper(loggerSetter, SpringContextPathFile);

            // Combine them into a composite
            IList<Bootstrapper> bootstrappers = new List<Bootstrapper>();
            bootstrappers.Add(commonLoggingBootstrapper);
            bootstrappers.Add(logBootstrapper);
            bootstrappers.Add(loggerSetter);
            //bootstrappers.Add(assemblyResolver);
            bootstrappers.Add(springBootstrapper);
            Bootstrapper bootstrapper = bootstrapperFactory.NewCompositeBootstrapper(loggerSetter, bootstrappers);

            // Bootstrap
            bootstrapper.Bootstrap();

            // Set the main object
            AddinMain = (AddinMain) springBootstrapper.Ctx.GetObject("AddinMainObj");
        }

        /// <summary>
        /// This method performs all the boostrapping for the assembly if it
        /// hasn't been done yet.
        /// </summary>
        private void EnsureBootstrappingIsDone() {
            if (!IsBootstrappingDone) {
                BootstrapAssembly();
            }
            IsBootstrappingDone = true;
        }

        /// <summary>
        /// Called Before EA starts to check Add-In Exists
        /// </summary>
        public String EA_Connect(EA.Repository repository) {
            EnsureBootstrappingIsDone();
            return AddinMain.EA_Connect(repository);
        }

        /// <summary>
        /// Todo
        /// </summary>
        /// <param name="repository"></param>
        /// <returns></returns>
        public object EA_OnInitializeTechnologies(Repository repository) {
            return AddinMain.EA_OnInitializeTechnologies(repository);
        }

        /// <summary>
        /// Called when user Click Add-Ins Menu item from within EA.
        /// Populates the Menu with our desired selections.
        /// </summary>
        public object EA_GetMenuItems(EA.Repository repository, string location, string menuName) {
            return AddinMain.EA_GetMenuItems(repository, location, menuName);
        }


        /// <summary>
        /// Called once Menu has been opened to see what menu items are active.
        /// </summary>
        /// <param name="repository"></param>
        /// <param name="location"></param>
        /// <param name="menuName"></param>
        /// <param name="itemName"></param>
        /// <param name="isEnabled"></param>
        /// <param name="isChecked"></param>
        public void EA_GetMenuState(Repository repository, string location, string menuName, string itemName, ref bool isEnabled, ref bool isChecked) {
            AddinMain.EA_GetMenuState(repository, location, menuName, itemName, ref isEnabled, ref isChecked);
        }


        /// <summary>
        /// Called when user makes a selection in the menu.
        /// This is your main exit point to the rest of your Add-in
        /// </summary>
        /// <param name="Repository"></param>
        /// <param name="Location"></param>
        /// <param name="MenuName"></param>
        /// <param name="ItemName"></param>
        public void EA_MenuClick(Repository repository, string location, string menuName, string itemName) {
            AddinMain.EA_MenuClick(repository, location, menuName, itemName);
        }
    }
}
