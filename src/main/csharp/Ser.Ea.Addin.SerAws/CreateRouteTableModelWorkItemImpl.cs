using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;

using EA;

namespace Ser.Ea.Addin.SerAws {
    class CreateRouteTableModelWorkItemImpl : WorkItem {

        public Package Pkg { set; get; } = null;
        public RouteTable RouteTable{ set; get; } = null;

        public void Process(WorkItemProcessor processor) {
            processor.ProcessCreateRouteTableModelWorkItem(this);
        }
    }
}
