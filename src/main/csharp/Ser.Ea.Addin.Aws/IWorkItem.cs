using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ser.Ea.Addin.Aws {
    interface IWorkItem {
        void Process(IWorkItemProcessor processor);
    }
}
