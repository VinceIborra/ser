using System;
using System.IO;

using EA;

namespace Ser.Ea.Addin {
    abstract public class AddinMainAbst : AddinMain {

        public String EA_Connect(Repository repository) {

            //No special processing required.
            return "a string";
        }

        virtual public object EA_OnInitializeTechnologies(Repository repository) {
            return null;
        }


        virtual public object EA_GetMenuItems(Repository repository, string location, string menuName) {
            return "";
        }

        virtual public void EA_GetMenuState(Repository repository, string location, string menuName, string itemName, ref bool isEnabled, ref bool isChecked) {

            // Everything is enabled by default
            isEnabled = true;

            // Nothing is checked
            isChecked = false;
        }

        virtual public void EA_MenuClick(Repository repository, string location, string menuName, string itemName) {
            return;
        }

    }
}
