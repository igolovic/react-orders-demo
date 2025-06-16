using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

public class AddOrderUseCase
{
    private readonly IOrderRepository orderRepository;

    public AddOrderUseCase(IOrderRepository orderRepository)
    {
        this.orderRepository = orderRepository;
    }

    public async Task<int> Execute(OrderUpdateDto dto)
    {
        var order = new Order
        {
            ClientId = dto.ClientId,
            DateCreated = DateTime.UtcNow,
            Items = dto.Items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                OrderId = 0, // Temporary value, will be set by the repository
            }).ToList()
        };
        await orderRepository.AddOrderAsync(order);
        await orderRepository.SaveChangesAsync();

        return order.Id;
    }
}
