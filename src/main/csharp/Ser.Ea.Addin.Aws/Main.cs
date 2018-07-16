/*
 * Created by SharpDevelop.
 * User: vji
 * Date: 17/12/2017
 * Time: 2:48 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.IO;
using System.Reflection;

using Common.Logging;
using Common.Logging.Configuration;
using Common.Logging.Log4Net;

using Spring.Context;
using Spring.Context.Support;
using System.Runtime.InteropServices;
using log4net.Config;

using EA;

using Ser.Aws;

namespace Ser.Ea.Addin.Aws {

    public class Main {

        Assembly _assembly = null;
        private IApplicationContext _context = null;
        private ILog _log = null;

        public Assembly Assembly {
            get {
                if (_assembly == null) {
                    _assembly = this.GetType().Assembly;
                }
                return _assembly;
            }
        }

        public IApplicationContext context {
            get {
                if (this._context == null) {
                    this._context = new XmlApplicationContext("assembly://Ser.Aws/Ser.Ea.Addin.Aws/config.context.xml");
                }
                return this._context;
            }
        }

        private ILog log {
            get {
                if (this._log == null) {
                    this._log = LogManager.GetLogger(this.GetType());
                }
                return this._log;
            }
        }

        private void EnsureLog4NetIsConfigured() {

            // Set Common.Logging adapter to use Log4Net
            NameValueCollection properties = new NameValueCollection();
            properties["configType"] = "EXTERNAL";
            Common.Logging.LogManager.Adapter = new Common.Logging.Log4Net.Log4NetLoggerFactoryAdapter(properties);

            // Configure Log4Net
            Stream stream = this.Assembly.GetManifestResourceStream("Ser.Ea.Addin.Aws.config.log4net.xml");
            global::log4net.Config.XmlConfigurator.Configure(stream);
        }

        //Called Before EA starts to check Add-In Exists
        public String EA_Connect(EA.Repository Repository) {
			//No special processing required.
			return "a string";
		}

        public object EA_OnInitializeTechnologies(EA.Repository repository) {
            string technology = "";
            Stream stream = this.Assembly.GetManifestResourceStream("Ser.Ea.Addin.Aws.config.seraws.xml");
            try {
                StreamReader reader = new StreamReader(stream);
                technology = reader.ReadToEnd();
            }
            catch (Exception e) {
                System.Windows.Forms.MessageBox.Show("Error Initializing Technology - " + e.ToString());
            }
            return technology;
        }

        public object EA_OnPostActivateTechnology(EA.Repository repository, EA.EventProperties info) {
            this.EnsureLog4NetIsConfigured();
            return false;
        }

        public object ProcessOperation(EA.Repository repository, object array) {
            MessageBox.Show("hello");
            //string elementGuid = ((string[]) array)[0];
            //EA.Project project = repository.GetProjectInterface();
            //bool ret = project.GenerateClass (elementGuid, "overwrite=1");
            //return "hello" + ret.ToString();
            return "hello";
		}

        public object CgtGenTags(EA.Repository repository, object array) {
            string tags = "[";
            string elementGuid = ((string[]) array)[0];
            string blockIndent = ((string[])array)[1];
            string indent = ((string[])array)[2];
            EA.Element element = repository.GetElementByGuid(elementGuid);
            for (short idx = 0; idx < element.TaggedValues.Count; idx++) {
                EA.TaggedValue taggedValue = element.TaggedValues.GetAt(idx);
                if (taggedValue.FQName == null || taggedValue.FQName == "") {
                    string tagval = blockIndent + indent + "{\"Key\" : \"" + taggedValue.Name + "\", \"Value\" : \"" + taggedValue.Value + "\"}";
                    tags = tags + "\n" + tagval;
                }
            }
            tags = tags + "\n" + blockIndent + "]"; 
            return tags;
        }

        public object MgtGenTags(EA.Repository repository, object array) {
            string tags = "";
            string elementGuid = ((string[])array)[0];
            EA.Element element = repository.GetElementByGuid(elementGuid);
            for (short idx = 0; idx < element.TaggedValues.Count; idx++) {
                EA.TaggedValue taggedValue = element.TaggedValues.GetAt(idx);
                if (taggedValue.FQName == null || taggedValue.FQName == "") {
                    string tagval = "Tag\n{\nname = \"" + taggedValue.Name + "\"\nvalue = \"" + taggedValue.Value + "\"\n}";
                    tags = tags + "\n" + tagval;
                }
            }
            tags = tags + "\n";
            return tags;
        }
//Tag
//{
//name = %qt%InstanceTenancy%qt%
//value = %qt%%classTag:"InstanceTenancy"%%qt%
//}
//%EXEC_ADD_IN("Ser.Aws", "MgtGenTags", classGUID)%

        /*
         * {
  "Key" : String,
  "Value" : String
}
         */

        public bool EA_OnPostNewConnector(EA.Repository repository, EA.EventProperties info) {
			//int count = info.Count;
			//EA.EventProperty property = info.Get(0);
			//string str = (string) property.Value;
			//int connectorId = Convert.ToInt32(str);
			//EA.Connector connector = repository.GetConnectorByID(connectorId);
			//connector.Name = "vji";
   //         connector.Update();
            
			return true;
		}

		//Called when user Click Add-Ins Menu item from within EA.
		//Populates the Menu with our desired selections.
		public object EA_GetMenuItems(EA.Repository Repository, string Location, string MenuName) {
			EA.Package aPackage = Repository.GetTreeSelectedPackage();
			switch( MenuName )
			{
				case "":
					return "-&Ser.Aws";
				case "-&Ser.Aws":
					string[] ar = {
                        "Set Profile",
                        "Import",
                        "Debug",
                        "About..."
                    };
					return ar;
			}
			return "";
		}
		
		//Sets the state of the menu depending if there is an active project or not
		bool IsProjectOpen(EA.Repository Repository)
		{
			try
			{
				EA.Collection c = Repository.Models;
				return true;
			}
			catch
			{
				return false;
			}
		}

		//Called once Menu has been opened to see what menu items are active.
		public void EA_GetMenuState(EA.Repository Repository, string Location, string MenuName, string ItemName, ref bool IsEnabled, ref bool IsChecked) {

            // Assume everything is disabled to being with
            IsEnabled = false;

            // No menu items need to be checked at this point in development
            IsChecked = false;

            // Menu items not dependent on whether a repository has been opened 
            if (ItemName == "Set Profile"
            ||  ItemName == "About..."
            ||  ItemName == "Debug") {
                IsEnabled = true;
                return;
            }

            // Rest of menu items requiring that a repository be opened
            if (ItemName == "Import"
            && IsProjectOpen(Repository)) {
                IsEnabled = true;
            }
		}

        //Called when user makes a selection in the menu.
        //This is your main exit point to the rest of your Add-in
        public void EA_MenuClick(EA.Repository Repository, string Location, string MenuName, string ItemName) {

            switch (ItemName) {

                case "Set Profile":
                    SetProfileForm setProfileForm = (SetProfileForm) this.context.GetObject("SetProfileForm");
                    setProfileForm.ShowDialog();
                    break;

                case "Import":

                    Package pkg = null;
                    if (Location == "TreeView") {

                        // Get the current package
                        pkg = Repository.GetTreeSelectedPackage();

                        // Query AWS
                        IAwsImporter awsImporter = (IAwsImporter) this.context.GetObject("AwsImporterObj");
                        awsImporter.Import(pkg);
                    }
                    break;

				case "About...":
                    AboutForm aboutForm = (AboutForm)this.context.GetObject("AboutForm");
                    aboutForm.ShowDialog();
					break;

                case "Debug":
                    this.log.Debug("hello jane 2");

                    //string[] resourceNames = this.Assembly.GetManifestResourceNames();
                    //foreach (string resourceName in resourceNames) {
                    //    System.Windows.Forms.MessageBox.Show(resourceName);
                    //}

                    break;
			}
		}
	}
}
		
		
	

