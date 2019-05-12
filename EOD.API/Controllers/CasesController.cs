namespace EOD.API.Controllers
{
    using EOD.BL.Services.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class CasesController : ControllerBase
    {
        private readonly ICasesService casesService;

        public CasesController(ICasesService casesService)
        {
            this.casesService = casesService;
        }
    }
}
