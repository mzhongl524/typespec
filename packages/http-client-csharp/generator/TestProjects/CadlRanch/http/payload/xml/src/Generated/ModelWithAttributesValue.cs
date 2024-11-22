// <auto-generated/>

#nullable disable

using System.ClientModel;
using System.ClientModel.Primitives;
using System.Threading;
using System.Threading.Tasks;
using Payload.Xml.Models;

namespace Payload.Xml
{
    public partial class ModelWithAttributesValue
    {
        protected ModelWithAttributesValue() => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult Get(RequestOptions options) => throw null;

        public virtual Task<ClientResult> GetAsync(RequestOptions options) => throw null;

        public virtual ClientResult<ModelWithAttributes> Get() => throw null;

        public virtual Task<ClientResult<ModelWithAttributes>> GetAsync(CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult Put(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> PutAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult Put(ModelWithAttributes input) => throw null;

        public virtual Task<ClientResult> PutAsync(ModelWithAttributes input, CancellationToken cancellationToken = default) => throw null;
    }
}
