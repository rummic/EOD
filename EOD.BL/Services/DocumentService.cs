using System;
using System.Collections.Generic;
using System.Text;
using EOD.BL.Services.Interfaces;
using EOD.DAL.Repositories.Interfaces;

namespace EOD.BL.Services
{
    class DocumentService : IDocumentService
    {
        private readonly IDocumentRepository _documentRepository;

        public DocumentService(IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }
    }
}
