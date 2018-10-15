using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;
using Amazon.RDS.Model;

using EA;

namespace Ser.Ea.Addin.SerAws {
    interface AwsModeller {

        void createModel(Package pkg, Vpc vpc, bool enableDnsSupport, bool enableDnsHostnames);
        void createModel(Package pkg, Amazon.EC2.Model.Subnet subnet);
        void createModel(Package pkg, RouteTable rt);
        void createModel(Package pkg, InternetGateway igw);
        void createModel(Package pkg, SecurityGroup sg);
        void createModel(Package pkg, NetworkAcl acl);

        void createModel(Package pkg, DBInstance dbInstance);
    }
}
