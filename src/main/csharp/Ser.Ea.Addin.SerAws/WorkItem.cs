using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ser.Ea.Addin.SerAws {
    interface WorkItem {
        void Process(WorkItemProcessor processor);
    }
}
