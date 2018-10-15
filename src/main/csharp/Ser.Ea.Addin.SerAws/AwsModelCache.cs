using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EA;

namespace Ser.Ea.Addin.SerAws {
    interface AwsModelCache {
        void Add(string id, Element element);
    }
}
