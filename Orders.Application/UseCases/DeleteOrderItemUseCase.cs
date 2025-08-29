using Orders.Domain.Interfaces;

public class DeleteOrderItemUseCase
{
    private readonly IOrderItemRepository orderItemRepository;

    public DeleteOrderItemUseCase(IOrderItemRepository orderItemRepository)
    {
        this.orderItemRepository = orderItemRepository;
    }

    public async Task Execute(int orderId, int productId)
    {
        await orderItemRepository.DeleteOrderItemAsync(orderId, productId);
        await orderItemRepository.SaveChangesAsync();
    }
}
