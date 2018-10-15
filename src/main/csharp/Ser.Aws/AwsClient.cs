using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;
using Amazon.EC2;
using Amazon.RDS;

namespace Ser.Aws {
    public interface AwsClient {
        CredentialProfile credentialProfile { get; set; }
        AWSCredentials AwsCredentials { get; }
        IAmazonEC2 Ec2Client { get; }
        IAmazonRDS RdsClient { get; }
    }
}
