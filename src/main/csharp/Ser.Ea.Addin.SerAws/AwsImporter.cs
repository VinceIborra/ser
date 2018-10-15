using System;
using EA;

namespace Ser.Ea.Addin.SerAws {
    interface AwsImporter {
        void Import(Package pkg);
    }
}
