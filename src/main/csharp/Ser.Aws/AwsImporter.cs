﻿using System;
using System.Runtime.Caching;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

using Amazon;
using Amazon.EC2;
using Amazon.EC2.Model;
using Amazon.SimpleDB;
using Amazon.SimpleDB.Model;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.RDS.Model;
using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;

using EA;

namespace Ser.Aws {

    class AwsImporter : IAwsImporter {

        private ObjectCache _cache = null;

        public ObjectCache Cache {
            get {
                if (_cache == null) {
                    _cache = MemoryCache.Default;
                }
                return _cache;
            }
        }

        public IAwsRepository AwsRepository { set; get; } = null;

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

        private Element createVpcModel(Package pkg, Vpc vpc) {

            // Get the model identifier
            string vpcId = vpc.VpcId.ToString();

            // Create the element
            Element element = pkg.Elements.AddNew(vpcId, "Class");
            element.Update();

            // Keep it in the cache
            this.Cache[vpcId] = element;

            //List<Amazon.EC2.Model.Tag> tags = vpc.Tags;
            //for (var jdx = 0; jdx < tags.Count; jdx++) {
            //    Amazon.EC2.Model.Tag tag = tags[jdx];
            //    sr.WriteLine("Key: " + tag.Key + ", Value: " + tag.Value);
            //}

            return element;
        }

        private void createSubnetModel(Package pkg, Amazon.EC2.Model.Subnet subnet) {

            // Get the model identifier
            string snId = subnet.SubnetId.ToString();

            // Create Subnet element
            Element subnetElement = pkg.Elements.AddNew(snId, "Class");
            subnetElement.Update();

            // Keep it in the cache
            this.Cache[snId] = subnetElement;
        }

        private void createSubnetModel(Package pkg, Amazon.EC2.Model.Subnet subnet, Element vpcElement) {

            // Get the model identifier
            string snId = subnet.SubnetId.ToString();

            // Create Subnet element
            Element subnetElement = pkg.Elements.AddNew(snId, "Class");
            subnetElement.Update();

            //// Link it to the VPC element
            //Connector connector = vpcElement.Connectors.AddNew("has", "Aggregation");
            //connector.ClientID = subnetElement.ElementID;
            //connector.SupplierID = vpcElement.ElementID;
            //connector.Update();

            // Keep it in the cache
            this.Cache[snId] = subnetElement;
        }

        private Element createRouteTableModel(Package pkg, RouteTable rt) {

            // Get the model identifier
            string rtId = rt.RouteTableId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(rtId, "Class");
            element.Update();

            // Keep it in the cache
            this.Cache[rtId] = element;

            return element;
        }

        private Element createInternetGatewayModel(Package pkg, InternetGateway igw) {

            // Get the model identifier
            string igwId = igw.InternetGatewayId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(igwId, "Class");
            element.Update();

            // Keep it in the cache
            this.Cache[igwId] = element;

            return element;
        }

        private Element createSecurityGroupModel(Package pkg, SecurityGroup sg) {

            // Get the model identifier
            string sgId = sg.GroupId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(sgId, "Class");
            element.Update();

            // Keep it in the cache
            this.Cache[sgId] = element;

            return element;
        }

        private Element createNetworkAclModel(Package pkg, NetworkAcl acl) {

            // Get the model identifier
            string aclId = acl.NetworkAclId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(aclId, "Class");
            element.Update();

            // Keep it in the cache
            this.Cache[aclId] = element;

            return element;
        }

        private Element createDbInstanceModel(Package pkg, DBInstance dbi) {

            // Get the model identifier
            string dbiId = dbi.DbiResourceId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(dbi.DbiResourceId.ToString(), "Class");
            element.Update();

            // Keep it in the cache
            this.Cache[dbiId] = element;

            return element;
        }


        //
        //
        //
        private void ImportVpcElements(Package pkg) {

            // VPCs
            IList<Vpc> vpcs = this.AwsRepository.FindVpcAll();
            foreach (Vpc vpc in vpcs) {
                Element vpcElement = this.createVpcModel(pkg, vpc);
            }

            // Subnets
            IList<Amazon.EC2.Model.Subnet> subnets = this.AwsRepository.FindSubnetAll();
            foreach (Amazon.EC2.Model.Subnet subnet in subnets) {
                this.createSubnetModel(pkg, subnet);
            }

            // Route tables
            IList<RouteTable> routeTables = this.AwsRepository.FindRouteTablesAll();
            foreach (RouteTable routeTable in routeTables) {
                this.createRouteTableModel(pkg, routeTable);
            }

            // Internet Gateways
            IList<InternetGateway> internetGateways = this.AwsRepository.FindInternetGatewaysAll();
            foreach (InternetGateway internetGateway in internetGateways) {
                this.createInternetGatewayModel(pkg, internetGateway);
            }

            // Security Groups
            IList<SecurityGroup> securityGroups = this.AwsRepository.FindSecurityGroupsAll();
            foreach (SecurityGroup securityGroup in securityGroups) {
                this.createSecurityGroupModel(pkg, securityGroup);
            }

            // Network ACLs
            IList<NetworkAcl> networkAcls = this.AwsRepository.FindNetworkAclsAll();
            foreach (NetworkAcl networkAcl in networkAcls) {
                this.createNetworkAclModel(pkg, networkAcl);
            }
        }

        //private string GetRdsInfo(Package pkg) {
        //    var dbInstancesQryRsp = this.AwsClient.RdsClient.DescribeDBInstances();
        //    foreach (DBInstance dbi in dbInstancesQryRsp.DBInstances) {
        //        this.createDbInstanceModel(pkg, dbi);
        //    }
        //    return "nothing - not used anymore";
        //}

        //private string GetSimpleDBDomainInfo() {
        //    StringBuilder sb = new StringBuilder(1024);
        //    using (StringWriter sr = new StringWriter(sb)) {

        //        // Print the number of Amazon SimpleDB domains.
        //        //IAmazonSimpleDB sdb = new AmazonSimpleDBClient();
        //        IAmazonSimpleDB sdb = new AmazonSimpleDBClient(this.AwsClient.AwsCredentials, RegionEndpoint.APSoutheast2);
        //        ListDomainsRequest sdbRequest = new ListDomainsRequest();

        //        try {
        //            ListDomainsResponse sdbResponse = sdb.ListDomains(sdbRequest);

        //            int numDomains = 0;
        //            numDomains = sdbResponse.DomainNames.Count;
        //            sr.WriteLine(string.Format("You have {0} Amazon SimpleDB domain(s) in the {1} region.",
        //                                       numDomains, ConfigurationManager.AppSettings["AWSRegion"]));
        //        }
        //        catch (AmazonSimpleDBException ex) {
        //            if (ex.ErrorCode != null && ex.ErrorCode.Equals("AuthFailure")) {
        //                sr.WriteLine("The account you are using is not signed up for Amazon SimpleDB.");
        //                sr.WriteLine("You can sign up for Amazon SimpleDB at http://aws.amazon.com/simpledb");
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

        //private string GetS3Info() {
        //    StringBuilder sb = new StringBuilder(1024);
        //    using (StringWriter sr = new StringWriter(sb)) {


        //        // Print the number of Amazon S3 Buckets.
        //        //IAmazonS3 s3Client = new AmazonS3Client();
        //        IAmazonS3 s3Client = new AmazonS3Client(this.AwsClient.AwsCredentials, RegionEndpoint.APSoutheast2);

        //        try {
        //            ListBucketsResponse response = s3Client.ListBuckets();
        //            int numBuckets = 0;
        //            if (response.Buckets != null &&
        //                response.Buckets.Count > 0) {
        //                numBuckets = response.Buckets.Count;
        //            }
        //            sr.WriteLine("You have " + numBuckets + " Amazon S3 bucket(s).");
        //        }
        //        catch (AmazonS3Exception ex) {
        //            if (ex.ErrorCode != null && (ex.ErrorCode.Equals("InvalidAccessKeyId") ||
        //                ex.ErrorCode.Equals("InvalidSecurity"))) {
        //                sr.WriteLine("Please check the provided AWS Credentials.");
        //                sr.WriteLine("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
        //            }
        //            else {
        //                sr.WriteLine("Caught Exception: " + ex.Message);
        //                sr.WriteLine("Response Status Code: " + ex.StatusCode);
        //                sr.WriteLine("Error Code: " + ex.ErrorCode);
        //                sr.WriteLine("Request ID: " + ex.RequestId);
        //            }
        //        }
        //        sr.WriteLine("Press any key to continue...");
        //    }
        //    return sb.ToString();
        //}

        public void Import(Package pkg) {

            this.ImportVpcElements(pkg);
            //string rdsInfo = this.GetRdsInfo(pkg);

            //string ec2Info = this.GetEc2Info();
            //string simpleDBDomainInfo = this.GetSimpleDBDomainInfo();
            //string s3Info = this.GetS3Info();
        }
    }
}
