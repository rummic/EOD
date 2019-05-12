using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EOD.BL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EOD.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class CaseController : ControllerBase
    {
        private readonly ICaseService _caseService;

        public CaseController(ICaseService caseService)
        {
            _caseService = caseService;
        }
    }
}
