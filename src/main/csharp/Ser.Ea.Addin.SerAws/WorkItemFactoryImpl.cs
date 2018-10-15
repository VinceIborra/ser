using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;
using Amazon.RDS.Model;

using EA;

namespace Ser.Ea.Addin.SerAws {
    class WorkItemFactoryImpl : WorkItemFactory {

        public SeedWorkItemImpl NewSeedWorkItem(Package pkg) {
            SeedWorkItemImpl workItem = new SeedWorkItemImpl();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllVpcsWorkItemImpl NewQueryAllVpcsWorkItem(Package pkg) {
            QueryAllVpcsWorkItemImpl workItem = new QueryAllVpcsWorkItemImpl();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllSubnetsWorkItemImpl NewQueryAllSubnetsWorkItem(Package pkg) {
            QueryAllSubnetsWorkItemImpl workItem = new QueryAllSubnetsWorkItemImpl();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllRouteTablesWorkItemImpl NewQueryAllRouteTablesWorkItem(Package pkg) {
            QueryAllRouteTablesWorkItemImpl workItem = new QueryAllRouteTablesWorkItemImpl();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllInternetGatewaysWorkItemImpl NewQueryAllInternetGatewaysWorkItem(Package pkg) {
            QueryAllInternetGatewaysWorkItemImpl workItem = new QueryAllInternetGatewaysWorkItemImpl();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllSecurityGroupsWorkItemImpl NewQueryAllSecurityGroupsWorkItem(Package pkg) {
            QueryAllSecurityGroupsWorkItemImpl workItem = new QueryAllSecurityGroupsWorkItemImpl();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllNetworkAclsWorkItemImpl NewQueryAllNetworkAclsWorkItem(Package pkg) {
            QueryAllNetworkAclsWorkItemImpl workItem = new QueryAllNetworkAclsWorkItemImpl();
            workItem.Pkg = pkg;
            return workItem;
        }

        public QueryAllDbInstancesWorkItemImpl NewQueryAllDbInstancesWorkItem(Package pkg) {
            QueryAllDbInstancesWorkItemImpl workItem = new QueryAllDbInstancesWorkItemImpl();
            workItem.Pkg = pkg;
            return workItem;
        }

        public CreateVpcModelWorkItemImpl NewCreateVpcModelWorkItem(Package pkg, Vpc vpc, bool enableDnsSupport, bool enableDnsHostnames) {
            CreateVpcModelWorkItemImpl workItem = new CreateVpcModelWorkItemImpl();
            workItem.Pkg = pkg;
            workItem.Vpc = vpc;
            workItem.EnableDnsSupport = enableDnsSupport;
            workItem.EnableDnsHostnames = enableDnsHostnames;
            return workItem;
        }

        public CreateSubnetModelWorkItemImpl NewCreateSubnetModelWorkItem(Package pkg, Amazon.EC2.Model.Subnet subnet) {
            CreateSubnetModelWorkItemImpl workItem = new CreateSubnetModelWorkItemImpl();
            workItem.Pkg = pkg;
            workItem.Subnet = subnet;
            return workItem;
        }

        public CreateRouteTableModelWorkItemImpl NewCreateRouteTableModelWorkItem(Package pkg, RouteTable routeTable) {
            CreateRouteTableModelWorkItemImpl workItem = new CreateRouteTableModelWorkItemImpl();
            workItem.Pkg = pkg;
            workItem.RouteTable = routeTable;
            return workItem;
        }

        public CreateInternetGatewayModelWorkItemImpl NewCreateInternetGatewayModelWorkItem(Package pkg, InternetGateway internetGateway) {
            CreateInternetGatewayModelWorkItemImpl workItem = new CreateInternetGatewayModelWorkItemImpl();
            workItem.Pkg = pkg;
            workItem.InternetGateway = internetGateway;
            return workItem;
        }

        public CreateSecurityGroupModelWorkItemImpl NewCreateSecurityGroupModelWorkItem(Package pkg, SecurityGroup securityGroup) {
            CreateSecurityGroupModelWorkItemImpl workItem = new CreateSecurityGroupModelWorkItemImpl();
            workItem.Pkg = pkg;
            workItem.SecurityGroup = securityGroup;
            return workItem;
        }

        public CreateNetworkAclModelWorkItemImpl NewCreateNetworkAclModelWorkItem(Package pkg, NetworkAcl networkAcl) {
            CreateNetworkAclModelWorkItemImpl workItem = new CreateNetworkAclModelWorkItemImpl();
            workItem.Pkg = pkg;
            workItem.NetworkAcl = networkAcl;
            return workItem;
        }

        public CreateDbInstanceModelWorkItemImpl NewCreateDbInstanceModelWorkItem(Package pkg, DBInstance dbInstance) {
            CreateDbInstanceModelWorkItemImpl workItem = new CreateDbInstanceModelWorkItemImpl();
            workItem.Pkg = pkg;
            workItem.DbInstance = dbInstance;
            return workItem;
        }

    }
}
