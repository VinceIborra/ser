using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.RDS.Model;

using EA;

namespace Ser.Ea.Addin.Aws {
    class CreateDbInstanceModelWorkItem : IWorkItem {

        public Package Pkg { set; get; } = null;
        public DBInstance DbInstance { set; get; } = null;

        public void Process(IWorkItemProcessor processor) {
            processor.ProcessCreateDbInstanceModelWorkItem(this);
        }
    }
}
