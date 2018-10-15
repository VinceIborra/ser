using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Ser.Ea.Addin;

namespace Ser.Ea.Addin.SerAws {
    public interface SerAwsAddinMain : AddinMain {
        TagTools TagTools { get; }
    }
}
