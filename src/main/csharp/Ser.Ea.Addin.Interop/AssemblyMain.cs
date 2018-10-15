using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EA;

namespace Ser.Ea.Addin.Interop {
    public interface AssemblyMain {

        AddinMain AddinMain { get; }

        String EA_Connect(EA.Repository repository);
        object EA_GetMenuItems(EA.Repository repository, string location, string menuName);
        void EA_GetMenuState(Repository repository, string location, string menuName, string itemName, ref bool isEnabled, ref bool isChecked);
        void EA_MenuClick(Repository repository, string location, string menuName, string itemName);
    }
}
