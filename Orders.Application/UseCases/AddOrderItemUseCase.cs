using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

public class AddOrderItemUseCase
{
    private readonly IOrderItemRepository orderItemRepository;

    public AddOrderItemUseCase(IOrderItemRepository orderItemRepository)
    {
        this.orderItemRepository = orderItemRepository;
    }

    public async Task Execute(OrderItemDto dto)
    {
        var order = new OrderItem
        {
            OrderId = dto.OrderId,
            ProductId = dto.ProductId,
            Quantity = dto.Quantity
        };
        await orderItemRepository.AddOrderItemAsync(order);
        await orderItemRepository.SaveChangesAsync();
    }
}
