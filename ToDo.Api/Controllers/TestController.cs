using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ToDo.Api.Controllers
{
    [Route("Test")]
    [AllowAnonymous]
    public class TestController : ApiController
    {
        [HttpGet("tost")]
        public async Task<IActionResult>Index()
        {
            return Ok(new string[] {"asd","Asd"});
        }
    }
}
