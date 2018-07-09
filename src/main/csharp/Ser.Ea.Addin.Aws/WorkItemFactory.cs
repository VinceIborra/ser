using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;
using Amazon.RDS.Model;

using EA;

namespace Ser.Ea.Addin.Aws {
    class WorkItemFactory : IWorkItemFactory {

        public SeedWorkItem NewSeedWorkItem(Package pkg) {
            SeedWorkItem workItem = new SeedWorkItem();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllVpcsWorkItem NewQueryAllVpcsWorkItem(Package pkg) {
            QueryAllVpcsWorkItem workItem = new QueryAllVpcsWorkItem();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllSubnetsWorkItem NewQueryAllSubnetsWorkItem(Package pkg) {
            QueryAllSubnetsWorkItem workItem = new QueryAllSubnetsWorkItem();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllRouteTablesWorkItem NewQueryAllRouteTablesWorkItem(Package pkg) {
            QueryAllRouteTablesWorkItem workItem = new QueryAllRouteTablesWorkItem();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllInternetGatewaysWorkItem NewQueryAllInternetGatewaysWorkItem(Package pkg) {
            QueryAllInternetGatewaysWorkItem workItem = new QueryAllInternetGatewaysWorkItem();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllSecurityGroupsWorkItem NewQueryAllSecurityGroupsWorkItem(Package pkg) {
            QueryAllSecurityGroupsWorkItem workItem = new QueryAllSecurityGroupsWorkItem();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllNetworkAclsWorkItem NewQueryAllNetworkAclsWorkItem(Package pkg) {
            QueryAllNetworkAclsWorkItem workItem = new QueryAllNetworkAclsWorkItem();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllDbInstancesWorkItem NewQueryAllDbInstancesWorkItem(Package pkg) {
            QueryAllDbInstancesWorkItem workItem = new QueryAllDbInstancesWorkItem();
            workItem.Pkg = pkg;
            return workItem;
        }

        public CreateVpcModelWorkItem NewCreateVpcModelWorkItem(Package pkg, Vpc vpc) {
            CreateVpcModelWorkItem workItem = new CreateVpcModelWorkItem();
            workItem.Pkg = pkg;
            workItem.Vpc = vpc;
            return workItem;
        }

        public CreateSubnetModelWorkItem NewCreateSubnetModelWorkItem(Package pkg, Amazon.EC2.Model.Subnet subnet) {
            CreateSubnetModelWorkItem workItem = new CreateSubnetModelWorkItem();
            workItem.Pkg = pkg;
            workItem.Subnet = subnet;
            return workItem;
        }

        public CreateRouteTableModelWorkItem NewCreateRouteTableModelWorkItem(Package pkg, RouteTable routeTable) {
            CreateRouteTableModelWorkItem workItem = new CreateRouteTableModelWorkItem();
            workItem.Pkg = pkg;
            workItem.RouteTable = routeTable;
            return workItem;
        }

        public CreateInternetGatewayModelWorkItem NewCreateInternetGatewayModelWorkItem(Package pkg, InternetGateway internetGateway) {
            CreateInternetGatewayModelWorkItem workItem = new CreateInternetGatewayModelWorkItem();
            workItem.Pkg = pkg;
            workItem.InternetGateway = internetGateway;
            return workItem;
        }

        public CreateSecurityGroupModelWorkItem NewCreateSecurityGroupModelWorkItem(Package pkg, SecurityGroup securityGroup) {
            CreateSecurityGroupModelWorkItem workItem = new CreateSecurityGroupModelWorkItem();
            workItem.Pkg = pkg;
            workItem.SecurityGroup = securityGroup;
            return workItem;
        }

        public CreateNetworkAclModelWorkItem NewCreateNetworkAclModelWorkItem(Package pkg, NetworkAcl networkAcl) {
            CreateNetworkAclModelWorkItem workItem = new CreateNetworkAclModelWorkItem();
            workItem.Pkg = pkg;
            workItem.NetworkAcl = networkAcl;
            return workItem;
        }

        public CreateDbInstanceModelWorkItem NewCreateDbInstanceModelWorkItem(Package pkg, DBInstance dbInstance) {
            CreateDbInstanceModelWorkItem workItem = new CreateDbInstanceModelWorkItem();
            workItem.Pkg = pkg;
            workItem.DbInstance = dbInstance;
            return workItem;
        }

    }
}
