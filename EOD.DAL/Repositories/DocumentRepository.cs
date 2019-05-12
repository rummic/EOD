using System;
using System.Collections.Generic;
using System.Text;
using EOD.DAL.Config;
using EOD.DAL.Repositories.Interfaces;

namespace EOD.DAL.Repositories
{
    class DocumentRepository : IDocumentRepository
    {
        private readonly ApplicationDbContext _context;

        public DocumentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
