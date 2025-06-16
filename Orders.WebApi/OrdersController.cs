using Microsoft.AspNetCore.Mvc;
using Orders.Application.UseCases;

namespace Orders.WebApi
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly GetOrdersPagedUseCase getOrdersPagedUseCase;
        private readonly UpdateOrderUseCase updateOrderUseCase;
        private readonly AddOrderUseCase addOrderUseCase;
        private readonly DeleteOrderUseCase deleteOrderUseCase;

        public OrdersController(GetOrdersPagedUseCase getOrdersPagedUseCase, UpdateOrderUseCase updateOrderUseCase, AddOrderUseCase addOrderUseCase, DeleteOrderUseCase deleteOrderUseCase)
        {
            this.getOrdersPagedUseCase = getOrdersPagedUseCase;
            this.updateOrderUseCase = updateOrderUseCase;
            this.addOrderUseCase = addOrderUseCase;
            this.deleteOrderUseCase = deleteOrderUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> Add(OrderUpdateDto order)
        {
            var result = await addOrderUseCase.Execute(order);
            return Ok(result);
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetOrdersPaged(int pageIndex, int pageSize, string sortColumn, string sortDirection, string? filter = null)
        {
            var result = await getOrdersPagedUseCase.Execute(pageIndex, pageSize, sortColumn, sortDirection, filter);
            return Ok(result);
        }

        [HttpPut()]
        public async Task<IActionResult> Update(OrderUpdateDto orderUpdate)
        {
            await updateOrderUseCase.Execute(orderUpdate);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int orderId, int productId)
        {
            await deleteOrderUseCase.Execute(orderId, productId);
            return Ok();
        }
    }
}
