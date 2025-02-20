// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.ClientModel;
using System.ComponentModel.Composition;
using System.Text.Json;
using Microsoft.CodeAnalysis;

namespace Microsoft.TypeSpec.Generator.ClientModel
{
    [Export(typeof(CodeModelPlugin))]
    [ExportMetadata("PluginName", nameof(ClientModelPlugin))]
    public class ClientModelPlugin : CodeModelPlugin
    {
        private static ClientModelPlugin? _instance;
        internal static ClientModelPlugin Instance => _instance ?? throw new InvalidOperationException("ClientModelPlugin is not loaded.");

        private ScmOutputLibrary? _scmOutputLibrary;
        public override OutputLibrary OutputLibrary => _scmOutputLibrary ??= new();

        public override ScmTypeFactory TypeFactory { get; }

        [ImportingConstructor]
        public ClientModelPlugin(GeneratorContext context)
            : base(context)
        {
            TypeFactory = new ScmTypeFactory();
            _instance = this;
        }

        public override void Configure()
        {
            base.Configure();
            AddVisitor(new DefaultScmLibraryVisitor());
            AddMetadataReference(MetadataReference.CreateFromFile(typeof(ClientResult).Assembly.Location));
            AddMetadataReference(MetadataReference.CreateFromFile(typeof(BinaryData).Assembly.Location));
            AddMetadataReference(MetadataReference.CreateFromFile(typeof(JsonSerializer).Assembly.Location));
        }
    }
}
