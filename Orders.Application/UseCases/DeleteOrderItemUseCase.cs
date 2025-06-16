using Orders.Domain.Interfaces;

public class DeleteOrderItemUseCase
{
    private readonly IOrderItemRepository orderItemRepository;

    public DeleteOrderItemUseCase(IOrderItemRepository orderItemRepository)
    {
        this.orderItemRepository = orderItemRepository;
    }

    public async Task Execute(int orderItemId)
    {
        await orderItemRepository.DeleteOrderItemAsync(orderItemId);
        await orderItemRepository.SaveChangesAsync();
    }
}
