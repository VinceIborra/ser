using System;
using System.Collections.Generic;
using System.Text;

using EA;

namespace Ser.Ea.Addin {
    public interface AddinMain {

        String EA_Connect(Repository repository);
        object EA_OnInitializeTechnologies(Repository repository);

        object EA_GetMenuItems(Repository repository, string location, string menuName);
        void EA_GetMenuState(Repository repository, string location, string menuName, string itemName, ref bool isEnabled, ref bool isChecked);
        void EA_MenuClick(Repository repository, string location, string menuName, string itemName);
    }
}
