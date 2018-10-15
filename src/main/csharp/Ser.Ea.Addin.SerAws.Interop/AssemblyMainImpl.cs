using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

using System.Windows.Forms;

using EA;

using Ser.Ea.Addin;
using Ser.Ea.Addin.Interop;

namespace Ser.Ea.Addin.SerAws.Interop {

    public class AssemblyMainImpl : AssemblyMainAbst, AssemblyMain {

        private const string DEFAULT_LOG4NET_ASSEMBLY_NAME = "Ser.Ea.Addin.SerAws.Interop";
        private const string DEFAULT_LOG4NET_XMLCFG_PATHFILE = "Ser.Ea.Addin.SerAws.Interop.log4net.xml";
        private const string DEFAULT_SPRING_CONTEXT_PATHFILE = "assembly://Ser.Ea.Addin.SerAws.Interop/Ser.Ea.Addin.SerAws.Interop/context.xml";

        private SerAwsAddinMain _serAwsAddinMain = null;

        private SerAwsAddinMain SerAwsAddinMain {
            get {
                if (_serAwsAddinMain == null) {
                    _serAwsAddinMain = ((SerAwsAddinMain) AddinMain);
                }
                return _serAwsAddinMain;
            }
        }

        public AssemblyMainImpl() {
            Log4NetAssembly = GetType().Assembly;
            //Log4NetAssemblyName = DEFAULT_LOG4NET_ASSEMBLY_NAME;
            Log4NetXmlCfgFPathFile = DEFAULT_LOG4NET_XMLCFG_PATHFILE;
            SpringContextPathFile = DEFAULT_SPRING_CONTEXT_PATHFILE;
        }


        public object CgtGenTags(Repository repository, object array) {
            return SerAwsAddinMain.TagTools.CgtGenTags(repository, array);
        }

        public object MgtGenTags(Repository repository, object array) {
            return SerAwsAddinMain.TagTools.MgtGenTags(repository, array);
        }
    }
}

//  public object ProcessOperation(Repository repository, object array) {
//          MessageBox.Show("hello");
//          //string elementGuid = ((string[]) array)[0];
//          //EA.Project project = repository.GetProjectInterface();
//          //bool ret = project.GenerateClass (elementGuid, "overwrite=1");
//          //return "hello" + ret.ToString();
//          return "hello";
//}

//public bool EA_OnPostNewConnector(Repository repository, EventProperties info) {
//int count = info.Count;
//EA.EventProperty property = info.Get(0);
//string str = (string) property.Value;
//int connectorId = Convert.ToInt32(str);
//EA.Connector connector = repository.GetConnectorByID(connectorId);
//connector.Name = "vji";
//         connector.Update();

//	return true;
//}




