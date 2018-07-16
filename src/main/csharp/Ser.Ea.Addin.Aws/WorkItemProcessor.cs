using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;
using Amazon.RDS.Model;

using Ser.Aws;

namespace Ser.Ea.Addin.Aws {
    class WorkItemProcessor : IWorkItemProcessor {

        public Queue<IWorkItem> WorkItemQueue { set; get; } = null;
        public IWorkItemFactory WorkItemFactory { set; get; } = null;

        public IAwsRepository AwsRepository { set; get; } = null;
        public IAwsModeller AwsModeller { set; get; } = null;

        public void Process(IWorkItem workItem) {
            workItem.Process(this);
        }

        public void ProcessSeedWorkItem(SeedWorkItem workItem) {
            this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewQueryAllVpcsWorkItem(workItem.Pkg));
            this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewQueryAllSubnetsWorkItem(workItem.Pkg));
            this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewQueryAllRouteTablesWorkItem(workItem.Pkg));
            this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewQueryAllInternetGatewaysWorkItem(workItem.Pkg));
            this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewQueryAllSecurityGroupsWorkItem(workItem.Pkg));
            this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewQueryAllNetworkAclsWorkItem(workItem.Pkg));
            this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewQueryAllDbInstancesWorkItem(workItem.Pkg));
        }

        public void ProcessQueryAllVpcsWorkItem(QueryAllVpcsWorkItem workItem) {

            // Get information about all Vpcs
            IList<Vpc> vpcs = this.AwsRepository.FindVpcAll();

            // Process each Vpc in turn
            foreach (Vpc vpc in vpcs) {

                // Get additional information for each Vpc
                bool enableDnsSupport = this.AwsRepository.GetVpcDnsSupportAttribute(vpc.VpcId);
                bool enableDnsHostnames = this.AwsRepository.GetVpcDnsHostnamesAttribute(vpc.VpcId);

                // Schedule work item to create the corresponding element
                this.WorkItemQueue.Enqueue(
                    this.WorkItemFactory.NewCreateVpcModelWorkItem(
                        workItem.Pkg, 
                        vpc,
                        enableDnsSupport,
                        enableDnsHostnames
                    )
                );
            }
        }

        public void ProcessQueryAllSubnetsWorkItem(QueryAllSubnetsWorkItem workItem) {
            IList<Amazon.EC2.Model.Subnet> subnets = this.AwsRepository.FindSubnetAll();
            foreach (Amazon.EC2.Model.Subnet subnet in subnets) {
                this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewCreateSubnetModelWorkItem(workItem.Pkg, subnet));
            }
        }

        public void ProcessQueryAllRouteTablesWorkItem(QueryAllRouteTablesWorkItem workItem) {
            IList<RouteTable> routeTables = this.AwsRepository.FindRouteTablesAll();
            foreach (RouteTable routeTable in routeTables) {
                this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewCreateRouteTableModelWorkItem(workItem.Pkg, routeTable));
            }
        }

        public void ProcessQueryAllInternetGatewaysWorkItem(QueryAllInternetGatewaysWorkItem workItem) {
            IList<InternetGateway> internetGateways = this.AwsRepository.FindInternetGatewaysAll();
            foreach (InternetGateway internetGateway in internetGateways) {
                this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewCreateInternetGatewayModelWorkItem(workItem.Pkg, internetGateway));
            }
        }

        public void ProcessQueryAllSecurityGroupsWorkItem(QueryAllSecurityGroupsWorkItem workItem) {
            IList<SecurityGroup> securityGroups = this.AwsRepository.FindSecurityGroupsAll();
            foreach (SecurityGroup securityGroup in securityGroups) {
                this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewCreateSecurityGroupModelWorkItem(workItem.Pkg, securityGroup));
            }
        }

        public void ProcessQueryAllNetworkAclsWorkItem(QueryAllNetworkAclsWorkItem workItem) {
            IList<NetworkAcl> networkAcls = this.AwsRepository.FindNetworkAclsAll();
            foreach (NetworkAcl networkAcl in networkAcls) {
                this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewCreateNetworkAclModelWorkItem(workItem.Pkg, networkAcl));
            }
        }

        public void ProcessQueryAllDbInstancesWorkItem(QueryAllDbInstancesWorkItem workItem) {
            IList<NetworkAcl> networkAcls = this.AwsRepository.FindNetworkAclsAll();
            foreach (NetworkAcl networkAcl in networkAcls) {
                this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewCreateNetworkAclModelWorkItem(workItem.Pkg, networkAcl));
            }
            IList<DBInstance> DbInstances = this.AwsRepository.FindDbInstancesAll();
            foreach (DBInstance dbInstance in DbInstances) {
                this.WorkItemQueue.Enqueue(this.WorkItemFactory.NewCreateDbInstanceModelWorkItem(workItem.Pkg, dbInstance));
            }

        }

        public void ProcessCreateVpcModelWorkItem(CreateVpcModelWorkItem workItem) {
            this.AwsModeller.createModel(workItem.Pkg, workItem.Vpc, workItem.EnableDnsSupport, workItem.EnableDnsHostnames);
        }
        public void ProcessCreateSubnetModelWorkItem(CreateSubnetModelWorkItem workItem) {
            this.AwsModeller.createModel(workItem.Pkg, workItem.Subnet);
        }
        public void ProcessCreateRouteTableModelWorkItem(CreateRouteTableModelWorkItem workItem) {
            this.AwsModeller.createModel(workItem.Pkg, workItem.RouteTable);
        }
        public void ProcessCreateInternetGatewayModelWorkItem(CreateInternetGatewayModelWorkItem workItem) {
            this.AwsModeller.createModel(workItem.Pkg, workItem.InternetGateway);
        }
        public void ProcessCreateSecurityGroupModelWorkItem(CreateSecurityGroupModelWorkItem workItem) {
            this.AwsModeller.createModel(workItem.Pkg, workItem.SecurityGroup);
        }
        public void ProcessCreateNetworkAclModelWorkItem(CreateNetworkAclModelWorkItem workItem) {
            this.AwsModeller.createModel(workItem.Pkg, workItem.NetworkAcl);
        }
        public void ProcessCreateDbInstanceModelWorkItem(CreateDbInstanceModelWorkItem workItem) {
            this.AwsModeller.createModel(workItem.Pkg, workItem.DbInstance);
        }

    }
}
/*
private void ImportRdsElements(Package pkg) {
    IList<DBInstance> DbInstances = this.AwsRepository.FindDbInstancesAll();
    foreach (DBInstance dbInstance in DbInstances) {
        this.AwsModeller.createModel(pkg, dbInstance);
    }
}
*/
/*
1 seed -> 2, 3
2 query all vpc -> 4, 5 
3 query all subnet -> 6, 7
4 vpc create 1 -> 8
5 vpc create 2 -> 9
6 subnet create 1
7 subnet create 2
8 rel vpc 1 to sn1
9 rel vpc 2 to sn2
*/

//private string GetEc2Info() {

//    StringBuilder sb = new StringBuilder(1024);
//    using (StringWriter sr = new StringWriter(sb)) {
//        sr.WriteLine("===========================================");
//        sr.WriteLine("Welcome to the AWS .NET SDK!");
//        sr.WriteLine("===========================================");

//        // Print the number of Amazon EC2 instances.
//        //IAmazonEC2 ec2 = new AmazonEC2Client(this.AwsCredentials, RegionEndpoint.APSoutheast2);
//        DescribeInstancesRequest ec2Request = new DescribeInstancesRequest();

//        try {
//            DescribeInstancesResponse ec2Response = this.AwsClient.Ec2Client.DescribeInstances(ec2Request);
//            int numInstances = 0;
//            numInstances = ec2Response.Reservations.Count;
//            sr.WriteLine(string.Format("You have {0} Amazon EC2 instance(s) running in the {1} region.",
//                                       numInstances, ConfigurationManager.AppSettings["AWSRegion"]));
//        }
//        catch (AmazonEC2Exception ex) {
//            if (ex.ErrorCode != null && ex.ErrorCode.Equals("AuthFailure")) {
//                sr.WriteLine("The account you are using is not signed up for Amazon EC2.");
//                sr.WriteLine("You can sign up for Amazon EC2 at http://aws.amazon.com/ec2");
//            }
//            else {
//                sr.WriteLine("Caught Exception: " + ex.Message);
//                sr.WriteLine("Response Status Code: " + ex.StatusCode);
//                sr.WriteLine("Error Code: " + ex.ErrorCode);
//                sr.WriteLine("Error Type: " + ex.ErrorType);
//                sr.WriteLine("Request ID: " + ex.RequestId);
//            }
//        }
//        sr.WriteLine();

//    }
//    return sb.ToString();
//}
