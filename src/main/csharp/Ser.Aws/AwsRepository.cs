﻿using System;
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
    class AwsRepository : IAwsRepository {

        public IAwsClient AwsClient { set; get; } = null;

        public IList<Vpc> FindVpcAll() {
            var vpcresponse = this.AwsClient.Ec2Client.DescribeVpcs();
            return vpcresponse.Vpcs;
        }

        public IList<Amazon.EC2.Model.Subnet> FindSubnetAll() {
            var response = this.AwsClient.Ec2Client.DescribeSubnets();
            return response.Subnets;
        }

        public IList<RouteTable> FindRouteTablesAll() {
            var routeTablesQueryRsp = this.AwsClient.Ec2Client.DescribeRouteTables();
            return routeTablesQueryRsp.RouteTables;
        }

        public IList<InternetGateway> FindInternetGatewaysAll() {
            var igwQueryRsp = this.AwsClient.Ec2Client.DescribeInternetGateways();
            return igwQueryRsp.InternetGateways;
        }

        public IList<SecurityGroup> FindSecurityGroupsAll() {
            var sgQueryRsp = this.AwsClient.Ec2Client.DescribeSecurityGroups();
            return sgQueryRsp.SecurityGroups;
        }

        public IList<NetworkAcl> FindNetworkAclsAll() {
            var aclQueryRsp = this.AwsClient.Ec2Client.DescribeNetworkAcls();
            return aclQueryRsp.NetworkAcls;
        }

        public IList<Amazon.EC2.Model.Subnet> FindSubnetsForVpc(string vpcId) {

            var response = this.AwsClient.Ec2Client.DescribeSubnets(new DescribeSubnetsRequest {
                Filters = new List<Amazon.EC2.Model.Filter> {
                                new Amazon.EC2.Model.Filter  {
                                    Name = "vpc-id",
                                    Values = new List<string> {
                                        vpcId
                                    }
                                }
                            }
            });

            return response.Subnets;
        }
    }
}