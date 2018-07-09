using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EA;

namespace Ser.Ea.Addin.Aws {
    class QueryAllInternetGatewaysWorkItem : IWorkItem {
        public Package Pkg { set; get; } = null;
        public void Process(IWorkItemProcessor processor) {
            processor.ProcessQueryAllInternetGatewaysWorkItem(this);
        }
    }
}
