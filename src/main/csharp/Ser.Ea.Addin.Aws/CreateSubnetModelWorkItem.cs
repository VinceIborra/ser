using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;

using EA;

namespace Ser.Ea.Addin.Aws {
    class CreateSubnetModelWorkItem : IWorkItem {

        public Package Pkg { set; get; } = null;
        public Amazon.EC2.Model.Subnet Subnet { set; get; } = null;

        public void Process(IWorkItemProcessor processor) {
            processor.ProcessCreateSubnetModelWorkItem(this);
        }
    }
}
