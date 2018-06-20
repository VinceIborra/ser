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

using Spring.Context;
using Spring.Context.Support;

using EA;

using Ser.Aws;

namespace Ser.Aws {

	public class Main {

		public string filecontents = "";
		public bool readline = false;
		public Form1 theForm;

        private IApplicationContext _context = null;
        private ILog _log = null;

        public IApplicationContext context {
            get {
                if (this._context == null) {
                    this._context = new XmlApplicationContext("assembly://Ser.Aws/Ser.Aws/context.xml");
                }
                return this._context;
            }
        }

        private ILog log {
            get {
                if (this._log == null) {
                    // create properties
                    NameValueCollection properties = new NameValueCollection();
                    properties["showDateTime"] = "true";

                    // set Adapter
                    //Common.Logging.LogManager.Adapter = new Common.Logging.Simple.ConsoleOutLoggerFactoryAdapter(properties);
                    Common.Logging.LogManager.Adapter = new Common.Logging.Simple.TraceLoggerFactoryAdapter(properties);

                    this._log = LogManager.GetLogger(this.GetType());
                    this._log.Debug("initialisation done");
                }
                return this._log;
            }
        }

        //Called Before EA starts to check Add-In Exists
        public String EA_Connect(EA.Repository Repository) {
			//No special processing required.
			return "a string";
		}

        public object EA_OnInitializeTechnologies(EA.Repository repository) {
            string technology = "";

            Assembly assem = this.GetType().Assembly;

            using (Stream stream = assem.GetManifestResourceStream("Ser.Aws.Ser.Aws.xml")) {

                try {

                    using (StreamReader reader = new StreamReader(stream)) {

                        technology = reader.ReadToEnd();

                    }

                }

                catch (Exception e) {

                    System.Windows.Forms.MessageBox.Show("Error Initializing Technology - " + e.ToString());

                }

            }

            return technology;
        }

        public object ProcessOperation(EA.Repository repository, object array) {
            MessageBox.Show("hello");
            //string elementGuid = ((string[]) array)[0];
            //EA.Project project = repository.GetProjectInterface();
            //bool ret = project.GenerateClass (elementGuid, "overwrite=1");
            //return "hello" + ret.ToString();
            return "hello";
		}
		
		public bool EA_OnPostNewConnector(EA.Repository repository, EA.EventProperties info) {
			int count = info.Count;
			EA.EventProperty property = info.Get(0);
			string str = (string) property.Value;
			int connectorId = Convert.ToInt32(str);
			EA.Connector connector = repository.GetConnectorByID(connectorId);
			connector.Name = "vji";
            connector.Update();
            
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
            ||  ItemName == "About...") {
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
                    this.log.Debug("Set Profile");
                    SetProfileForm form = (SetProfileForm) this.context.GetObject("SetProfileForm");
                    form.ShowDialog();
                    break;

                case "Import":

                    Package pkg = null;
                    if (Location == "TreeView") {

                        // Get the current package
                        pkg = Repository.GetTreeSelectedPackage();

                        // Query AWS
                        HelloAws aws = (HelloAws)this.context.GetObject("HelloAws");
                        string notes = aws.GetServiceOutput(pkg);

                        // Debug
                        //MessageBox.Show(notes);
                    }
                    break;

				case "About...":
					Form1 anAbout = new Form1();
					anAbout.ShowDialog();					
					break;
			}
		}
	}
}
		
		
	

