using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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


namespace Ser.Aws {
    public interface IAwsRepository {

        IList<Vpc> FindVpcAll();
        IList<Amazon.EC2.Model.Subnet> FindSubnetAll();
        IList<RouteTable> FindRouteTablesAll();
        IList<InternetGateway> FindInternetGatewaysAll();
        IList<SecurityGroup> FindSecurityGroupsAll();
        IList<NetworkAcl> FindNetworkAclsAll();

        bool GetVpcDnsSupportAttribute(string vpcId);
        bool GetVpcDnsHostnamesAttribute(string vpcId);

        IList<Amazon.EC2.Model.Subnet> FindSubnetsForVpc(string vpcId);

        IList<DBInstance> FindDbInstancesAll();
    }
}
