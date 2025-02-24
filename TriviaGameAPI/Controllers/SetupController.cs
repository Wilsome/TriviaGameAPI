using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TriviaGameAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetupController : ControllerBase
    {
        public IActionResult Setup(int playerCount, int questionCount, int category) 
        {
            return Ok("test");
        }
    }
}
