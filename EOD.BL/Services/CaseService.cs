using System;
using System.Collections.Generic;
using System.Text;
using EOD.BL.Services.Interfaces;
using EOD.DAL.Repositories.Interfaces;

namespace EOD.BL.Services
{
    class CaseService : ICaseService
    {
        private readonly ICaseRepository _caseRepository;

        public CaseService(ICaseRepository caseRepository)
        {
            _caseRepository = caseRepository;
        }
    }
}
