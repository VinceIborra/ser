using System;
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

using Ser.Ea.Addin.Aws;

namespace Ser.Aws {

    class AwsImporter : IAwsImporter {

        public Queue<IWorkItem> WorkItemQueue { set; get; } = null;
        public IWorkItemFactory WorkItemFactory { set; get; } = null;
        public IWorkItemProcessor WorkItemProcessor { set; get; } = null;

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

            // Seed the work Item queue
            IWorkItem seedWorkItem = this.WorkItemFactory.NewSeedWorkItem(pkg);
            this.WorkItemQueue.Enqueue(seedWorkItem);

            // Process all work items, until we are done
            while (this.WorkItemQueue.Count > 0) {
                IWorkItem workItem = this.WorkItemQueue.Dequeue();
                this.WorkItemProcessor.Process(workItem);
            }

            //this.ImportRdsElements(pkg);

            //string ec2Info = this.GetEc2Info();
            //string simpleDBDomainInfo = this.GetSimpleDBDomainInfo();
            //string s3Info = this.GetS3Info();
        }
    }
}
