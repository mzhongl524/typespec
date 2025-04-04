// <auto-generated/>

#nullable disable

using System;
using System.ClientModel;
using System.ClientModel.Primitives;
using System.Threading;
using System.Threading.Tasks;
using Client.Structure.Service;

namespace Client.Structure.ClientOperationGroup
{
    public partial class FirstClient
    {
        protected FirstClient() => throw null;

        public FirstClient(Uri endpoint, ClientType client) : this(endpoint, client, new FirstClientOptions()) => throw null;

        public FirstClient(Uri endpoint, ClientType client, FirstClientOptions options) => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult One(RequestOptions options) => throw null;

        public virtual Task<ClientResult> OneAsync(RequestOptions options) => throw null;

        public virtual ClientResult One(CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult> OneAsync(CancellationToken cancellationToken = default) => throw null;

        public virtual Group3 GetGroup3Client() => throw null;

        public virtual Group4 GetGroup4Client() => throw null;
    }
}
