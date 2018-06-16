using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;
using Amazon.EC2;

namespace Ser.Aws {
    public interface AwsLoginInformation {
        CredentialProfile credentialProfile { get; set; }
        AWSCredentials AwsCredentials { get; }
        IAmazonEC2 Ec2Client { get; }
    }
}
