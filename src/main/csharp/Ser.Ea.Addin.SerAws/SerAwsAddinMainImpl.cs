using System;
using System.Collections.Generic;
using System.Text;
using System.IO;

using Spring.Core.IO;

using EA;

using Ser.Ea.Addin;

namespace Ser.Ea.Addin.SerAws {

    class SerAwsAddinMainImpl : AddinMainAbst, SerAwsAddinMain {

        public Spring.Core.IO.IResource MdgFileResource { set; get; } = null;

        public AwsImporter AwsImporter { set; get; }
        public TagTools TagTools { set; get; }

        public SetProfileForm SetProfileForm { set; get; } = null;
        public AboutForm AboutForm { set; get; }

        override public object EA_OnInitializeTechnologies(Repository repository) {
            string technology = "";
            Stream stream = MdgFileResource.InputStream;
            StreamReader reader = new StreamReader(stream);
            technology = reader.ReadToEnd();
            return technology;
        }

        /// <summary>
        /// Called when user Click Add-Ins Menu item from within EA.
        /// Populates the Menu with our desired selections.
        /// </summary>
        override public object EA_GetMenuItems(Repository repository, string location, string menuName) {
            switch (menuName) {
                case "":
                    return "-&SerAws";
                case "-&SerAws":
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

        /// <summary>
        /// Sets the state of the menu depending if there is an active project or not
        /// </summary>
        bool IsProjectOpen(Repository repository) {
            try {
                Collection c = repository.Models;
                return true;
            }
            catch (System.Runtime.InteropServices.COMException exc) {
                return false;
            }
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
        override public void EA_GetMenuState(Repository repository, string location, string menuName, string itemName, ref bool isEnabled, ref bool isChecked) {

            // Assume everything is disabled to being with
            isEnabled = false;

            // No menu items need to be checked at this point in development
            isChecked = false;

            // Menu items not dependent on whether a repository has been opened 
            if (itemName == "Set Profile"
            ||  itemName == "About..."
            ||  itemName == "Debug") {
                isEnabled = true;
                return;
            }

            // Rest of menu items requiring that a repository be opened
            if (itemName == "Import"
            && IsProjectOpen(repository)) {
                isEnabled = true;
            }
        }

        override public void EA_MenuClick(Repository repository, string location, string menuName, string itemName) {

            switch (itemName) {

                case "Set Profile":
                    SetProfileForm.ShowDialog();
                    break;

                case "Import":

                    Package pkg = null;
                    if (location == "TreeView") {

                        // Get the current package
                        pkg = repository.GetTreeSelectedPackage();

                        // Query AWS
                        AwsImporter.Import(pkg);
                    }
                    break;

                case "About...":
                    AboutForm.ShowDialog();
                    break;

                //case "Debug":
                //    this.log.Debug("hello jane 2");

                    //string[] resourceNames = this.Assembly.GetManifestResourceNames();
                    //foreach (string resourceName in resourceNames) {
                    //    System.Windows.Forms.MessageBox.Show(resourceName);
                    //}

                //    break;
            }
        }

    }
}
