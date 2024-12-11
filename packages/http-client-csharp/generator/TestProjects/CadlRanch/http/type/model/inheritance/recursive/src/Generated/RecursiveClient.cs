// <auto-generated/>

#nullable disable

using System;
using System.ClientModel;
using System.ClientModel.Primitives;
using System.Threading;
using System.Threading.Tasks;
using _Type.Model.Inheritance.Recursive.Models;

namespace _Type.Model.Inheritance.Recursive
{
    public partial class RecursiveClient
    {
        public RecursiveClient() : this(new Uri("http://localhost:3000"), new RecursiveClientOptions()) => throw null;

        public RecursiveClient(Uri endpoint, RecursiveClientOptions options) => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult Put(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> PutAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult Put(Extension input) => throw null;

        public virtual Task<ClientResult> PutAsync(Extension input, CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult Get(RequestOptions options) => throw null;

        public virtual Task<ClientResult> GetAsync(RequestOptions options) => throw null;

        public virtual ClientResult<Extension> Get() => throw null;

        public virtual Task<ClientResult<Extension>> GetAsync(CancellationToken cancellationToken = default) => throw null;
    }
}
