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

namespace Vji.Bob {

    class HelloAws {

        public string GetServiceOutput() {

            //var credentials = new StoredProfileAWSCredentials("vjisys");
            var chain = new CredentialProfileStoreChain();
            CredentialProfile basicProfile;
            AWSCredentials credentials = null;
            if (chain.TryGetProfile("default", out basicProfile)) {
                // Use basicProfile
                credentials = basicProfile.GetAWSCredentials(null);
            }

            StringBuilder sb = new StringBuilder(1024);
            using (StringWriter sr = new StringWriter(sb)) {
                sr.WriteLine("===========================================");
                sr.WriteLine("Welcome to the AWS .NET SDK!");
                sr.WriteLine("===========================================");

                // Print the number of Amazon EC2 instances.
                //IAmazonEC2 ec2 = new AmazonEC2Client();
                IAmazonEC2 ec2 = new AmazonEC2Client(credentials, RegionEndpoint.APSoutheast2);
                DescribeInstancesRequest ec2Request = new DescribeInstancesRequest();

                try {
                    DescribeInstancesResponse ec2Response = ec2.DescribeInstances(ec2Request);
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


                // vjivjivji
                //var vpcresponse = ec2.DescribeVpcs(new DescribeVpcsRequest {
                //    VpcIds = new List<string> {
                //    "vpc-ead45e8d "
                //    }
                //});
                var vpcresponse = ec2.DescribeVpcs();

                List<Vpc> vpcs = vpcresponse.Vpcs;
                for (var idx = 0; idx < vpcs.Count; idx++) {
                    Vpc vpc = vpcs[idx];
                    sr.WriteLine("VPC: " + vpc.ToString());
                    List<Amazon.EC2.Model.Tag> tags = vpc.Tags;
                    for (var jdx = 0; jdx < tags.Count; jdx++) {
                        Amazon.EC2.Model.Tag tag = tags[jdx];
                        sr.WriteLine("Key: " + tag.Key + ", Value: " + tag.Value);
                    }
                }
                sr.WriteLine();
                // vjivjivji



                // Print the number of Amazon SimpleDB domains.
                //IAmazonSimpleDB sdb = new AmazonSimpleDBClient();
                IAmazonSimpleDB sdb = new AmazonSimpleDBClient(credentials, RegionEndpoint.APSoutheast2);
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

                // Print the number of Amazon S3 Buckets.
                //IAmazonS3 s3Client = new AmazonS3Client();
                IAmazonS3 s3Client = new AmazonS3Client(credentials, RegionEndpoint.APSoutheast2);

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
    }
}
