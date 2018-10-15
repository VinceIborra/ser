using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;

namespace Ser.Log4net {
    public interface LoggerRecipient {
        ILog Logger { set; get; }
    }
}
