using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;

namespace Ser.Ea.Addin.Aws {
    interface IWorkItemProcessor {
        void Process(IWorkItem workItem);

        void ProcessSeedWorkItem(SeedWorkItem workItem);
        void ProcessQueryAllVpcsWorkItem(QueryAllVpcsWorkItem workItem);
        void ProcessQueryAllSubnetsWorkItem(QueryAllSubnetsWorkItem workItem);
        void ProcessQueryAllRouteTablesWorkItem(QueryAllRouteTablesWorkItem workItem);
        void ProcessQueryAllInternetGatewaysWorkItem(QueryAllInternetGatewaysWorkItem workItem);
        void ProcessQueryAllSecurityGroupsWorkItem(QueryAllSecurityGroupsWorkItem workItem);
        void ProcessQueryAllNetworkAclsWorkItem(QueryAllNetworkAclsWorkItem workItem);
        void ProcessQueryAllDbInstancesWorkItem(QueryAllDbInstancesWorkItem workItem);

        void ProcessCreateVpcModelWorkItem(CreateVpcModelWorkItem workItem);
        void ProcessCreateSubnetModelWorkItem(CreateSubnetModelWorkItem workItem);
        void ProcessCreateRouteTableModelWorkItem(CreateRouteTableModelWorkItem workItem);
        void ProcessCreateInternetGatewayModelWorkItem(CreateInternetGatewayModelWorkItem workItem);
        void ProcessCreateSecurityGroupModelWorkItem(CreateSecurityGroupModelWorkItem workItem);
        void ProcessCreateNetworkAclModelWorkItem(CreateNetworkAclModelWorkItem workItem);
        void ProcessCreateDbInstanceModelWorkItem(CreateDbInstanceModelWorkItem workItem);
    }
}
