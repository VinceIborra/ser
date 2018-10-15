using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.RDS.Model;

using EA;

namespace Ser.Ea.Addin.SerAws {
    class CreateDbInstanceModelWorkItemImpl : WorkItem {

        public Package Pkg { set; get; } = null;
        public DBInstance DbInstance { set; get; } = null;

        public void Process(WorkItemProcessor processor) {
            processor.ProcessCreateDbInstanceModelWorkItem(this);
        }
    }
}
