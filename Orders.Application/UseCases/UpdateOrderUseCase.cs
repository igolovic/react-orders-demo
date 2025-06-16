using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

public class UpdateOrderUseCase
{
    private readonly IOrderRepository orderRepository;

    public UpdateOrderUseCase(IOrderRepository orderRepository)
    {
        this.orderRepository = orderRepository;
    }

    public async Task Execute(OrderUpdateDto dto)
    {
        var order = new Order
        {
            Id = dto.Id,
            ClientId = dto.ClientId,
            DateModified = DateTime.UtcNow
            //Items = dto.Items.Select(i => new OrderItem
            //{
            //    OrderId = dto.Id,
            //    ProductId = i.ProductId,
            //    Quantity = i.Quantity
            //}
            //).ToList()
        };

        orderRepository.UpdateOrderAsync(order);
        await orderRepository.SaveChangesAsync();
    }
}
