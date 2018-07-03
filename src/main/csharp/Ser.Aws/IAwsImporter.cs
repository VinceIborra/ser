using System;
using EA;

namespace Ser.Aws {
    interface IAwsImporter {
        void Import(Package pkg);
    }
}
