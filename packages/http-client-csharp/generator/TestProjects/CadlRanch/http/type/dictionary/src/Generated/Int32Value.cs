// <auto-generated/>

#nullable disable

using System.ClientModel;
using System.ClientModel.Primitives;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace _Type.Dictionary
{
    public partial class Int32Value
    {
        protected Int32Value() => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult Get(RequestOptions options) => throw null;

        public virtual Task<ClientResult> GetAsync(RequestOptions options) => throw null;

        public virtual ClientResult<IDictionary<string, int>> Get() => throw null;

        public virtual Task<ClientResult<IDictionary<string, int>>> GetAsync(CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult Put(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> PutAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult Put(IDictionary<string, int> body) => throw null;

        public virtual Task<ClientResult> PutAsync(IDictionary<string, int> body, CancellationToken cancellationToken = default) => throw null;
    }
}
