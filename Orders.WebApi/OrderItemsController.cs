using Microsoft.AspNetCore.Mvc;

namespace Orders.WebApi
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemsController : ControllerBase
    {
        private readonly GetOrderItemsUseCase getOrderItemsUseCase;
        private readonly AddOrderItemUseCase addOrderItemUseCase;
        private readonly UpdateOrderItemUseCase updateOrderItemUseCase;
        private readonly DeleteOrderItemUseCase deleteOrderItemUseCase;

        public OrderItemsController(
            GetOrderItemsUseCase getOrderItemsUseCase,
            AddOrderItemUseCase addOrderItemUseCase,
            UpdateOrderItemUseCase updateOrderItemUseCase,
            DeleteOrderItemUseCase deleteOrderItemUseCase)
        {
            this.getOrderItemsUseCase = getOrderItemsUseCase;
            this.addOrderItemUseCase = addOrderItemUseCase;
            this.updateOrderItemUseCase = updateOrderItemUseCase;
            this.deleteOrderItemUseCase = deleteOrderItemUseCase;
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetByOrderId(int orderId)
        {
            var result = await getOrderItemsUseCase.Execute(orderId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(OrderItemDto orderItem)
        {
            await addOrderItemUseCase.Execute(orderItem);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(OrderItemDto orderItem)
        {
            await updateOrderItemUseCase.Execute(orderItem);
            return Ok();
        }

        [HttpDelete("{orderItemId}")]
        public async Task<IActionResult> Delete(int orderItemId)
        {
            await deleteOrderItemUseCase.Execute(orderItemId);
            return Ok();
        }
    }
}
