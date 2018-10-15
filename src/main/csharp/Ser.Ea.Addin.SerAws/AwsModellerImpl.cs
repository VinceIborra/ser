using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Common.Logging;

using Amazon.EC2.Model;
using Amazon.RDS.Model;
using EA;

namespace Ser.Ea.Addin.SerAws {
    class AwsModellerImpl : AwsModeller {

        private ILog _log = null;

        public AwsModelCache AwsModelCache { set; get; } = null;

        private ILog log {
            get {
                if (this._log == null) {
                    this._log = LogManager.GetLogger(this.GetType());
                }
                return this._log;
            }
        }

        private TaggedValue GetTaggedValue(Element element, string name) {
            TaggedValue tv = null;
            for (short idx = 0; idx < element.TaggedValues.Count; idx++) {
                tv = element.TaggedValues.GetAt(idx);
                if (tv.Name == name) {
                    return tv;
                }
            }
            return null;
        }


        public void createModel(Package pkg, Vpc vpc, bool enableDnsSupport, bool enableDnsHostnames) {

            this.log.Debug("{");
            this.log.Debug("   VpcId = " + vpc.VpcId + ",");
            this.log.Debug("   CidrBlock = " + vpc.CidrBlock + ",");
            this.log.Debug("   EnableDnsSupport = " + enableDnsSupport + ",");
            this.log.Debug("   EnableDnsHostnames = " + enableDnsHostnames + ",");
            this.log.Debug("   InstanceTenancy = " + vpc.InstanceTenancy + ",");
            this.log.Debug("}");

            // Get the model identifier
            string vpcId = vpc.VpcId.ToString();

            // Create the element
            Element element = pkg.Elements.AddNew(vpcId, "SerAwsMdl::MDL_EC2_Vpc");
            element.Update();

            // Language - Default to C#
            element.Gentype = "C#";

            // Stereotype Tagged Values
            TaggedValue vpcIdTv = this.GetTaggedValue(element, "VpcId");
            vpcIdTv.Value = vpc.VpcId;
            vpcIdTv.Update();

            TaggedValue cidrBlockTv = this.GetTaggedValue(element, "CidrBlock");
            cidrBlockTv.Value = vpc.CidrBlock;
            cidrBlockTv.Update();

            TaggedValue enableDnsSupportTv = this.GetTaggedValue(element, "EnableDnsSupport");
            enableDnsSupportTv.Value = enableDnsSupport.ToString();
            enableDnsSupportTv.Update();

            TaggedValue enableDnsHostnamesTv = this.GetTaggedValue(element, "EnableDnsHostnames");
            enableDnsHostnamesTv.Value = enableDnsSupport.ToString();
            enableDnsHostnamesTv.Update();

            TaggedValue instanceTenancyTv = this.GetTaggedValue(element, "InstanceTenancy");
            instanceTenancyTv.Value = vpc.InstanceTenancy.ToString();
            instanceTenancyTv.Update();

            // AWS Tags
            List<Amazon.EC2.Model.Tag> tags = vpc.Tags;
            string name = null;
            for (var jdx = 0; jdx < tags.Count; jdx++) {

                // Set a corresponding tagged value
                Amazon.EC2.Model.Tag tag = tags[jdx];
                this.log.Debug("Key: " + tag.Key + ", Value: " + tag.Value);
                var tv = element.TaggedValues.AddNew(tag.Key, tag.Value);
                tv.Update();

                // Keep track of the name, as this is a special case
                if (tag.Key == "Name") {
                    name = tag.Value;
                }
            }

            // Set the name of the element to match "Name" tag
            if (name != null) {
                element.Name = name;
                element.Update();
            }

            // Keep it in the cache
            this.AwsModelCache.Add(vpcId, element);
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
