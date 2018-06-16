using System;
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
using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;

using EA;

namespace Ser.Aws {

    class HelloAws {

        public AwsLoginInformation awsLoginInformation { set; get; } = null;

        private string GetEc2Info() {

            StringBuilder sb = new StringBuilder(1024);
            using (StringWriter sr = new StringWriter(sb)) {
                sr.WriteLine("===========================================");
                sr.WriteLine("Welcome to the AWS .NET SDK!");
                sr.WriteLine("===========================================");

                // Print the number of Amazon EC2 instances.
                //IAmazonEC2 ec2 = new AmazonEC2Client(this.AwsCredentials, RegionEndpoint.APSoutheast2);
                DescribeInstancesRequest ec2Request = new DescribeInstancesRequest();

                try {
                    DescribeInstancesResponse ec2Response = this.awsLoginInformation.Ec2Client.DescribeInstances(ec2Request);
                    int numInstances = 0;
                    numInstances = ec2Response.Reservations.Count;
                    sr.WriteLine(string.Format("You have {0} Amazon EC2 instance(s) running in the {1} region.",
                                               numInstances, ConfigurationManager.AppSettings["AWSRegion"]));
                }
                catch (AmazonEC2Exception ex) {
                    if (ex.ErrorCode != null && ex.ErrorCode.Equals("AuthFailure")) {
                        sr.WriteLine("The account you are using is not signed up for Amazon EC2.");
                        sr.WriteLine("You can sign up for Amazon EC2 at http://aws.amazon.com/ec2");
                    }
                    else {
                        sr.WriteLine("Caught Exception: " + ex.Message);
                        sr.WriteLine("Response Status Code: " + ex.StatusCode);
                        sr.WriteLine("Error Code: " + ex.ErrorCode);
                        sr.WriteLine("Error Type: " + ex.ErrorType);
                        sr.WriteLine("Request ID: " + ex.RequestId);
                    }
                }
                sr.WriteLine();

            }
            return sb.ToString();
        }

        public Element createVpcModel(Package pkg, Vpc vpc) {
            Element element = pkg.Elements.AddNew(vpc.VpcId.ToString(), "Class");
            element.Update();
            return element;
        }

        public void createSubnetModel(Package pkg, Subnet subnet, Element vpcElement) {

            // Create Subnet element
            Element subnetElement = pkg.Elements.AddNew(subnet.SubnetId.ToString(), "Class");
            subnetElement.Update();

            // Link it to the VPC element
            Connector connector = vpcElement.Connectors.AddNew("has", "Aggregation");
            connector.ClientID = subnetElement.ElementID;
            connector.SupplierID = vpcElement.ElementID;
            connector.Update();
        }


        //
        //
        //
        public string GetVpcInfo(Package pkg) {
            StringBuilder sb = new StringBuilder(1024);
            using (StringWriter sr = new StringWriter(sb)) {
                var vpcresponse = this.awsLoginInformation.Ec2Client.DescribeVpcs();

                List<Vpc> vpcs = vpcresponse.Vpcs;
                for (var idx = 0; idx < vpcs.Count; idx++) {

                    // VPC
                    Vpc vpc = vpcs[idx];
                    Element vpcElement = this.createVpcModel(pkg, vpc);
                    sr.WriteLine("VPC: " + vpc.ToString());
                    sr.WriteLine("VPC Id:" + vpc.VpcId.ToString());
                    List<Amazon.EC2.Model.Tag> tags = vpc.Tags;
                    for (var jdx = 0; jdx < tags.Count; jdx++) {
                        Amazon.EC2.Model.Tag tag = tags[jdx];
                        sr.WriteLine("Key: " + tag.Key + ", Value: " + tag.Value);
                    }

                    // Subnets
                    var response = this.awsLoginInformation.Ec2Client.DescribeSubnets(new DescribeSubnetsRequest {
                        Filters = new List<Amazon.EC2.Model.Filter> {
                            new Amazon.EC2.Model.Filter  {
                                Name = "vpc-id",
                                Values = new List<string> {
                                    vpc.VpcId.ToString()
                                }
                            }
                        }
                    });

                    List<Subnet> subnets = response.Subnets;
                    for (var jdx = 0; jdx < subnets.Count; jdx++) {
                        Subnet subnet = subnets[idx];
                        sr.WriteLine("SN: " + subnet.ToString());
                        this.createSubnetModel(pkg, subnet, vpcElement);
                    }
                }
                sr.WriteLine();
            }
            return sb.ToString();

        }

        public string GetSimpleDBDomainInfo() {
            StringBuilder sb = new StringBuilder(1024);
            using (StringWriter sr = new StringWriter(sb)) {

                // Print the number of Amazon SimpleDB domains.
                //IAmazonSimpleDB sdb = new AmazonSimpleDBClient();
                IAmazonSimpleDB sdb = new AmazonSimpleDBClient(this.awsLoginInformation.AwsCredentials, RegionEndpoint.APSoutheast2);
                ListDomainsRequest sdbRequest = new ListDomainsRequest();

                try {
                    ListDomainsResponse sdbResponse = sdb.ListDomains(sdbRequest);

                    int numDomains = 0;
                    numDomains = sdbResponse.DomainNames.Count;
                    sr.WriteLine(string.Format("You have {0} Amazon SimpleDB domain(s) in the {1} region.",
                                               numDomains, ConfigurationManager.AppSettings["AWSRegion"]));
                }
                catch (AmazonSimpleDBException ex) {
                    if (ex.ErrorCode != null && ex.ErrorCode.Equals("AuthFailure")) {
                        sr.WriteLine("The account you are using is not signed up for Amazon SimpleDB.");
                        sr.WriteLine("You can sign up for Amazon SimpleDB at http://aws.amazon.com/simpledb");
                    }
                    else {
                        sr.WriteLine("Caught Exception: " + ex.Message);
                        sr.WriteLine("Response Status Code: " + ex.StatusCode);
                        sr.WriteLine("Error Code: " + ex.ErrorCode);
                        sr.WriteLine("Error Type: " + ex.ErrorType);
                        sr.WriteLine("Request ID: " + ex.RequestId);
                    }
                }
                sr.WriteLine();

            }
            return sb.ToString();
        }

        private string GetS3Info() {
            StringBuilder sb = new StringBuilder(1024);
            using (StringWriter sr = new StringWriter(sb)) {


                // Print the number of Amazon S3 Buckets.
                //IAmazonS3 s3Client = new AmazonS3Client();
                IAmazonS3 s3Client = new AmazonS3Client(this.awsLoginInformation.AwsCredentials, RegionEndpoint.APSoutheast2);

                try {
                    ListBucketsResponse response = s3Client.ListBuckets();
                    int numBuckets = 0;
                    if (response.Buckets != null &&
                        response.Buckets.Count > 0) {
                        numBuckets = response.Buckets.Count;
                    }
                    sr.WriteLine("You have " + numBuckets + " Amazon S3 bucket(s).");
                }
                catch (AmazonS3Exception ex) {
                    if (ex.ErrorCode != null && (ex.ErrorCode.Equals("InvalidAccessKeyId") ||
                        ex.ErrorCode.Equals("InvalidSecurity"))) {
                        sr.WriteLine("Please check the provided AWS Credentials.");
                        sr.WriteLine("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                    }
                    else {
                        sr.WriteLine("Caught Exception: " + ex.Message);
                        sr.WriteLine("Response Status Code: " + ex.StatusCode);
                        sr.WriteLine("Error Code: " + ex.ErrorCode);
                        sr.WriteLine("Request ID: " + ex.RequestId);
                    }
                }
                sr.WriteLine("Press any key to continue...");
            }
            return sb.ToString();
        }

        public string GetServiceOutput(Package pkg) {

            string ec2Info = this.GetEc2Info();
            string vpcInfo = this.GetVpcInfo(pkg);
            string simpleDBDomainInfo = this.GetSimpleDBDomainInfo();
            string s3Info = this.GetS3Info();

            return ec2Info + vpcInfo + simpleDBDomainInfo + s3Info;
        }
    }
}
