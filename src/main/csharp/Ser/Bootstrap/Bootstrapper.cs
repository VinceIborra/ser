using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ser.Bootstrap {
    public interface Bootstrapper {
        bool IsDone { get; }
        void Bootstrap();
    }
}
