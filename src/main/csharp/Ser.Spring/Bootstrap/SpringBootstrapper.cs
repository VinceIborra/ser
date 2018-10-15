using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Spring.Context;
using Ser.Log4net;
using Ser.Bootstrap;

namespace Ser.Spring.Bootstrap {
    public interface SpringBootstrapper : Bootstrapper, LoggerRecipient {
        IApplicationContext Ctx { get; }
    }
}
