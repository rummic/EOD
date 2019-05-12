using System;
using System.Collections.Generic;
using System.Text;
using EOD.BL.Services.Interfaces;
using EOD.DAL.Repositories.Interfaces;

namespace EOD.BL.Services
{
    class DocumentsService : IDocumentsService
    {
        private readonly IDocumentsRepository documentsRepository;

        public DocumentsService(IDocumentsRepository documentsRepository)
        {
            this.documentsRepository = documentsRepository;
        }
    }
}
