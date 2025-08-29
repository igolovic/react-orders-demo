using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

public class AddOrderUseCase
{
    private readonly IOrderRepository orderRepository;

    public AddOrderUseCase(IOrderRepository orderRepository)
    {
        this.orderRepository = orderRepository;
    }

    public async Task<OrderDto> Execute(OrderUpdateDto dto)
    {
        var order = new Order
        {
            ClientId = dto.ClientId,
            DateCreated = DateTime.UtcNow,
            OrderItems = dto.OrderItems.Select(oi => new OrderItem
            {
                OrderItemId = oi.OrderItemId,
                ProductId = oi.ProductId,
                Quantity = oi.Quantity,
                UnitPriceOnCreatedDate = oi.UnitPriceOnCreatedDate,
                OrderId = 0, // Temporary value, will be set by the repository
            }).ToList()
        };
        await orderRepository.AddOrderAsync(order);
        await orderRepository.SaveChangesAsync();

        var insertedOrder = await orderRepository.GetOrderByIdAsync(order.OrderId);

        var orderDto = (OrderDto)insertedOrder;
        return orderDto;
    }
}
