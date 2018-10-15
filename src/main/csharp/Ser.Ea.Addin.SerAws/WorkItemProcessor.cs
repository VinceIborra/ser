using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;

namespace Ser.Ea.Addin.SerAws {
    interface WorkItemProcessor {
        void Process(WorkItem workItem);

        void ProcessSeedWorkItem(SeedWorkItemImpl workItem);
        void ProcessQueryAllVpcsWorkItem(QueryAllVpcsWorkItemImpl workItem);
        void ProcessQueryAllSubnetsWorkItem(QueryAllSubnetsWorkItemImpl workItem);
        void ProcessQueryAllRouteTablesWorkItem(QueryAllRouteTablesWorkItemImpl workItem);
        void ProcessQueryAllInternetGatewaysWorkItem(QueryAllInternetGatewaysWorkItemImpl workItem);
        void ProcessQueryAllSecurityGroupsWorkItem(QueryAllSecurityGroupsWorkItemImpl workItem);
        void ProcessQueryAllNetworkAclsWorkItem(QueryAllNetworkAclsWorkItemImpl workItem);
        void ProcessQueryAllDbInstancesWorkItem(QueryAllDbInstancesWorkItemImpl workItem);

        void ProcessCreateVpcModelWorkItem(CreateVpcModelWorkItemImpl workItem);
        void ProcessCreateSubnetModelWorkItem(CreateSubnetModelWorkItemImpl workItem);
        void ProcessCreateRouteTableModelWorkItem(CreateRouteTableModelWorkItemImpl workItem);
        void ProcessCreateInternetGatewayModelWorkItem(CreateInternetGatewayModelWorkItemImpl workItem);
        void ProcessCreateSecurityGroupModelWorkItem(CreateSecurityGroupModelWorkItemImpl workItem);
        void ProcessCreateNetworkAclModelWorkItem(CreateNetworkAclModelWorkItemImpl workItem);
        void ProcessCreateDbInstanceModelWorkItem(CreateDbInstanceModelWorkItemImpl workItem);
    }
}
