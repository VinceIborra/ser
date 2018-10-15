using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;
using Amazon.RDS.Model;

using EA;

namespace Ser.Ea.Addin.SerAws {
    interface WorkItemFactory {

        SeedWorkItemImpl NewSeedWorkItem(Package pkg);

        QueryAllVpcsWorkItemImpl NewQueryAllVpcsWorkItem(Package pkg);
        QueryAllSubnetsWorkItemImpl NewQueryAllSubnetsWorkItem(Package pkg);
        QueryAllRouteTablesWorkItemImpl NewQueryAllRouteTablesWorkItem(Package pkg);
        QueryAllInternetGatewaysWorkItemImpl NewQueryAllInternetGatewaysWorkItem(Package pkg);
        QueryAllSecurityGroupsWorkItemImpl NewQueryAllSecurityGroupsWorkItem(Package pkg);
        QueryAllNetworkAclsWorkItemImpl NewQueryAllNetworkAclsWorkItem(Package pkg);
        QueryAllDbInstancesWorkItemImpl NewQueryAllDbInstancesWorkItem(Package pkg);

        CreateVpcModelWorkItemImpl NewCreateVpcModelWorkItem(Package pkg, Vpc vpc, bool enableDnsSupport, bool enableDnsHostnames);
        CreateSubnetModelWorkItemImpl NewCreateSubnetModelWorkItem(Package pkg, Amazon.EC2.Model.Subnet subnet);
        CreateRouteTableModelWorkItemImpl NewCreateRouteTableModelWorkItem(Package pkg, RouteTable routeTable);
        CreateInternetGatewayModelWorkItemImpl NewCreateInternetGatewayModelWorkItem(Package pkg, InternetGateway internetGateway);
        CreateSecurityGroupModelWorkItemImpl NewCreateSecurityGroupModelWorkItem(Package pkg, SecurityGroup securityGroup);
        CreateNetworkAclModelWorkItemImpl NewCreateNetworkAclModelWorkItem(Package pkg, NetworkAcl networkAcl);
        CreateDbInstanceModelWorkItemImpl NewCreateDbInstanceModelWorkItem(Package pkg, DBInstance dbInstance);
    }
}
