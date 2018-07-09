using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;
using Amazon.RDS.Model;

using EA;

namespace Ser.Ea.Addin.Aws {
    interface IWorkItemFactory {

        SeedWorkItem NewSeedWorkItem(Package pkg);

        QueryAllVpcsWorkItem NewQueryAllVpcsWorkItem(Package pkg);
        QueryAllSubnetsWorkItem NewQueryAllSubnetsWorkItem(Package pkg);
        QueryAllRouteTablesWorkItem NewQueryAllRouteTablesWorkItem(Package pkg);
        QueryAllInternetGatewaysWorkItem NewQueryAllInternetGatewaysWorkItem(Package pkg);
        QueryAllSecurityGroupsWorkItem NewQueryAllSecurityGroupsWorkItem(Package pkg);
        QueryAllNetworkAclsWorkItem NewQueryAllNetworkAclsWorkItem(Package pkg);
        QueryAllDbInstancesWorkItem NewQueryAllDbInstancesWorkItem(Package pkg);

        CreateVpcModelWorkItem NewCreateVpcModelWorkItem(Package pkg, Vpc vpc);
        CreateSubnetModelWorkItem NewCreateSubnetModelWorkItem(Package pkg, Amazon.EC2.Model.Subnet subnet);
        CreateRouteTableModelWorkItem NewCreateRouteTableModelWorkItem(Package pkg, RouteTable routeTable);
        CreateInternetGatewayModelWorkItem NewCreateInternetGatewayModelWorkItem(Package pkg, InternetGateway internetGateway);
        CreateSecurityGroupModelWorkItem NewCreateSecurityGroupModelWorkItem(Package pkg, SecurityGroup securityGroup);
        CreateNetworkAclModelWorkItem NewCreateNetworkAclModelWorkItem(Package pkg, NetworkAcl networkAcl);
        CreateDbInstanceModelWorkItem NewCreateDbInstanceModelWorkItem(Package pkg, DBInstance dbInstance);
    }
}
