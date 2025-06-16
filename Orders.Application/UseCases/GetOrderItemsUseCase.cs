using Orders.Domain.Interfaces;

public class GetOrderItemsUseCase
{
    private readonly IOrderItemRepository orderItemRepository;

    public GetOrderItemsUseCase(IOrderItemRepository orderItemRepository)
    {
        this.orderItemRepository = orderItemRepository;
    }

    public async Task<IEnumerable<OrderItemDto>> Execute(int orderId)
    {
        var orderItems = await orderItemRepository.GetOrderItemsByOrderId(orderId);

        return orderItems.Select(orderItem => new OrderItemDto
        {
            OrderId = orderId,
            ProductId = orderItem.ProductId
        });
    }
}
