using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EA;

namespace Ser.Ea.Addin.SerAws {
    public class TagToolsImpl : TagTools {

        public object CgtGenTags(Repository repository, object array) {
            string tags = "[";
            string elementGuid = ((string[])array)[0];
            string blockIndent = ((string[])array)[1];
            string indent = ((string[])array)[2];
            EA.Element element = repository.GetElementByGuid(elementGuid);
            for (short idx = 0; idx < element.TaggedValues.Count; idx++) {
                EA.TaggedValue taggedValue = element.TaggedValues.GetAt(idx);
                if (taggedValue.FQName == null || taggedValue.FQName == "") {
                    string tagval = blockIndent + indent + "{\"Key\" : \"" + taggedValue.Name + "\", \"Value\" : \"" + taggedValue.Value + "\"}";
                    tags = tags + "\n" + tagval;
                }
            }
            tags = tags + "\n" + blockIndent + "]";
            return tags;
        }

        public object MgtGenTags(Repository repository, object array) {
            string tags = "";
            string elementGuid = ((string[])array)[0];
            EA.Element element = repository.GetElementByGuid(elementGuid);
            for (short idx = 0; idx < element.TaggedValues.Count; idx++) {
                EA.TaggedValue taggedValue = element.TaggedValues.GetAt(idx);
                if (taggedValue.FQName == null || taggedValue.FQName == "") {
                    string tagval = "Tag\n{\nname = \"" + taggedValue.Name + "\"\nvalue = \"" + taggedValue.Value + "\"\n}";
                    tags = tags + "\n" + tagval;
                }
            }
            tags = tags + "\n";
            return tags;
        }
    }
}
