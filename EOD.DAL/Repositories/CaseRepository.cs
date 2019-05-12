using System;
using System.Collections.Generic;
using System.Text;
using EOD.DAL.Config;
using EOD.DAL.Repositories.Interfaces;

namespace EOD.DAL.Repositories
{
    public class CaseRepository : ICaseRepository
    {
        private readonly ApplicationDbContext _context;

        public CaseRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
