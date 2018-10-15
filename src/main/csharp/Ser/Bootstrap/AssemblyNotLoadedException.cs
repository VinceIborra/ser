using System;

namespace Ser.Bootstrap {
    public class AssemblyNotLoadedException : Exception {
        public AssemblyNotLoadedException (string message)
            : base(message) {
        }
    }
}
