using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;

using EA;

namespace Ser.Ea.Addin.Aws {
    class CreateNetworkAclModelWorkItem : IWorkItem {

        public Package Pkg { set; get; } = null;
        public NetworkAcl NetworkAcl { set; get; } = null;

        public void Process(IWorkItemProcessor processor) {
            processor.ProcessCreateNetworkAclModelWorkItem(this);
        }
    }
}
