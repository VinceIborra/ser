using Amazon;
using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;
using Amazon.EC2;

namespace Ser.Aws {
    public class AwsLoginInformationImpl : AwsLoginInformation {

        private CredentialProfile _credentialProfile = null;
        private AWSCredentials _awsCredentials = null;
        private IAmazonEC2 _ec2Client = null;

        public CredentialProfile credentialProfile {
            set {
                _credentialProfile = value;
                this.AwsCredentials = null;
            }
            get {
                return _credentialProfile;
            }
        }

        public AWSCredentials AwsCredentials {
            private set {
                _awsCredentials = value;
                this.Ec2Client = null;
            }
            get {
                if (_awsCredentials == null) {
                    _awsCredentials = this.credentialProfile.GetAWSCredentials(null);
                }
                return _awsCredentials;
            }
        }

        public IAmazonEC2 Ec2Client {
            set {
                _ec2Client = value;
            }
            get {
                if (_ec2Client == null) {
                    _ec2Client = new AmazonEC2Client(this.AwsCredentials, RegionEndpoint.APSoutheast2);
                }
                return _ec2Client;
            }
        }
    }
}
