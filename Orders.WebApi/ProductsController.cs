using Microsoft.AspNetCore.Mvc;
using Orders.Application.UseCases;

namespace Orders.WebApi
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly GetProductsUseCase getProductsUseCase;

        public ProductsController(GetProductsUseCase getProductsUseCase)
        {
            this.getProductsUseCase = getProductsUseCase;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await getProductsUseCase.Execute();
            return Ok(result);
        }
    }
}
