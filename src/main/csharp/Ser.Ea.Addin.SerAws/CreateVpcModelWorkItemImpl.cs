using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;

using EA;

namespace Ser.Ea.Addin.SerAws {
    class CreateVpcModelWorkItemImpl : WorkItem {

        public Package Pkg { set; get; } = null;
        public Vpc Vpc { set; get; } = null;
        public bool EnableDnsSupport { set; get; } = false;
        public bool EnableDnsHostnames { set; get; } = false;

        public void Process(WorkItemProcessor processor) {
            processor.ProcessCreateVpcModelWorkItem(this);
        }
    }
}
