﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EA;

namespace Ser.Ea.Addin.SerAws {
    class QueryAllRouteTablesWorkItemImpl : WorkItem {
        public Package Pkg { set; get; } = null;
        public void Process(WorkItemProcessor processor) {
            processor.ProcessQueryAllRouteTablesWorkItem(this);
        }
    }
}
