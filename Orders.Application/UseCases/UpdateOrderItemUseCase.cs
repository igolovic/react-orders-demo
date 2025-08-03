using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

public class UpdateOrderItemUseCase
{
    private readonly IOrderItemRepository orderRepository;

    public UpdateOrderItemUseCase(IOrderItemRepository orderItemRepository)
    {
        this.orderRepository = orderItemRepository;
    }

    public async Task Execute(OrderItemDto dto)
    {
        var order = new OrderItem
        {
            OrderItemId = dto.OrderItemId,
            OrderId = dto.OrderId,
            ProductId = dto.ProductId,
            Quantity = dto.Quantity
        };

        await orderRepository.UpdateOrderItemAsync(order);
        await orderRepository.SaveChangesAsync();
    }
}
