using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EA;

namespace Ser.Ea.Addin.SerAws {
    public interface TagTools {
        object CgtGenTags(Repository repository, object array);
        object MgtGenTags(Repository repository, object array);
    }
}
