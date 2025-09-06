using Orders.Domain.Interfaces;

public class DeleteOrderUseCase
{
    private readonly IOrderRepository orderRepository;

    public DeleteOrderUseCase(IOrderRepository orderRepository)
    {
        this.orderRepository = orderRepository;
    }

    public async Task Execute(int orderId)
    {
        await orderRepository.DeleteOrderAsync(orderId);
        await orderRepository.SaveChangesAsync();
    }
}
