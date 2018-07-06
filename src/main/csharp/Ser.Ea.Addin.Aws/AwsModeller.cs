using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Amazon.EC2.Model;
using Amazon.RDS.Model;
using EA;

namespace Ser.Ea.Addin.Aws {
    class AwsModeller : IAwsModeller {

        public IAwsModelCache AwsModelCache { set; get; } = null;

        public void createModel(Package pkg, Vpc vpc) {

            // Get the model identifier
            string vpcId = vpc.VpcId.ToString();

            // Create the element
            Element element = pkg.Elements.AddNew(vpcId, "Class");
            element.Update();

            // Keep it in the cache
            this.AwsModelCache.Add(vpcId, element);

            //List<Amazon.EC2.Model.Tag> tags = vpc.Tags;
            //for (var jdx = 0; jdx < tags.Count; jdx++) {
            //    Amazon.EC2.Model.Tag tag = tags[jdx];
            //    sr.WriteLine("Key: " + tag.Key + ", Value: " + tag.Value);
            //}

            //return element;
        }

        public void createModel(Package pkg, Amazon.EC2.Model.Subnet subnet) {

            // Get the model identifier
            string snId = subnet.SubnetId.ToString();

            // Create Subnet element
            Element subnetElement = pkg.Elements.AddNew(snId, "Class");
            subnetElement.Update();

            // Keep it in the cache
            this.AwsModelCache.Add(snId, subnetElement);
        }

        //void createSubnetModel(Package pkg, Amazon.EC2.Model.Subnet subnet, Element vpcElement) {

        //    // Get the model identifier
        //    string snId = subnet.SubnetId.ToString();

        //    // Create Subnet element
        //    Element subnetElement = pkg.Elements.AddNew(snId, "Class");
        //    subnetElement.Update();

        //    //// Link it to the VPC element
        //    //Connector connector = vpcElement.Connectors.AddNew("has", "Aggregation");
        //    //connector.ClientID = subnetElement.ElementID;
        //    //connector.SupplierID = vpcElement.ElementID;
        //    //connector.Update();

        //    // Keep it in the cache
        //    this.Cache[snId] = subnetElement;
        //}

        public void createModel(Package pkg, RouteTable rt) {

            // Get the model identifier
            string rtId = rt.RouteTableId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(rtId, "Class");
            element.Update();

            // Keep it in the cache
            this.AwsModelCache.Add(rtId, element);
        }

        public void createModel(Package pkg, InternetGateway igw) {

            // Get the model identifier
            string igwId = igw.InternetGatewayId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(igwId, "Class");
            element.Update();

            // Keep it in the cache
            this.AwsModelCache.Add(igwId, element);
        }

        public void createModel(Package pkg, SecurityGroup sg) {

            // Get the model identifier
            string sgId = sg.GroupId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(sgId, "Class");
            element.Update();

            // Keep it in the cache
            this.AwsModelCache.Add(sgId, element);
        }

        public void createModel(Package pkg, NetworkAcl acl) {

            // Get the model identifier
            string aclId = acl.NetworkAclId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(aclId, "Class");
            element.Update();

            // Keep it in the cache
            this.AwsModelCache.Add(aclId, element);
        }

        public void createModel(Package pkg, DBInstance dbi) {

            // Get the model identifier
            string dbiId = dbi.DbiResourceId.ToString();

            // Create the Route Table element
            Element element = pkg.Elements.AddNew(dbi.DbiResourceId.ToString(), "Class");
            element.Update();

            // Keep it in the cache
            this.AwsModelCache.Add(dbiId, element);
        }
    }
}
