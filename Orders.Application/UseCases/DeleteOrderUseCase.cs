using Orders.Domain.Interfaces;

public class DeleteOrderUseCase
{
    private readonly IOrderRepository orderRepository;
    private readonly IOrderItemRepository orderItemRepository;

    public DeleteOrderUseCase(IOrderRepository orderRepository, IOrderItemRepository orderItemRepository)
    {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;

    }

    public async Task Execute(int orderId, int productId)
    {
        var items = await orderItemRepository.GetOrderItemsByOrderId(orderId);
        foreach (var item in items)
        {
            await orderItemRepository.DeleteOrderItemAsync(orderId, productId);
        }

        await orderRepository.DeleteOrderAsync(orderId);

        await orderItemRepository.SaveChangesAsync();
        await orderRepository.SaveChangesAsync();
    }
}
