using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Caching;

using EA;

namespace Ser.Ea.Addin.SerAws {
    class AwsModelCacheImpl : AwsModelCache {

        private ObjectCache _cache = null;

        public ObjectCache Cache {
            get {
                if (_cache == null) {
                    _cache = MemoryCache.Default;
                }
                return _cache;
            }
        }

        public void Add(string id, Element element) {
            this.Cache[id] = element;
        }

    }
}
