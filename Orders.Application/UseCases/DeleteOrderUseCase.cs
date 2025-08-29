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

    public async Task Execute(int orderId)
    {
        var orderItems = await orderItemRepository.GetOrderItemsByOrderId(orderId);
        foreach (var orderItem in orderItems)
        {
            await orderItemRepository.DeleteOrderItemAsync(orderId, orderItem.Product.ProductId);
        }

        await orderRepository.DeleteOrderAsync(orderId);

        await orderItemRepository.SaveChangesAsync();
        await orderRepository.SaveChangesAsync();
    }
}
