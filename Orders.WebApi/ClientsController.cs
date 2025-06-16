using Microsoft.AspNetCore.Mvc;
using Orders.Application.UseCases;

namespace Orders.WebApi
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly GetClientsUseCase getClientsUseCase;

        public ClientsController(GetClientsUseCase getClientsUseCase)
        {
            this.getClientsUseCase = getClientsUseCase;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await getClientsUseCase.Execute();
            return Ok(result);
        }
    }
}
