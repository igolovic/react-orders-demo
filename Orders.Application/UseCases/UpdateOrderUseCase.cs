using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

public class UpdateOrderUseCase
{
    private readonly IOrderRepository orderRepository;
    private readonly IOrderItemRepository orderItemRepository;

    public UpdateOrderUseCase(IOrderRepository orderRepository, IOrderItemRepository orderItemRepository)
    {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public async Task Execute(OrderUpdateDto dto)
    {
        var existingOrder = await orderRepository.GetOrderByIdAsync(dto.Id);
        if (existingOrder == null)
            throw new Exception("Order not found.");

        existingOrder.ClientId = dto.ClientId;
        existingOrder.DateModified = DateTime.UtcNow;

        var oldItems = existingOrder.Items.ToList();
        var newItems = dto.Items;

        foreach (var item in newItems)
        {
            var existingItem = oldItems.FirstOrDefault(oi => oi.OrderId == item.OrderId && oi.ProductId == item.ProductId);
            if (existingItem != null)
            {
                // Update quantity if the item exists
                existingItem.Quantity = item.Quantity;
            }
            else
            {
                // Add new item if it doesn't exist in the old items
                var newItem = new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    OrderId = existingOrder.Id // Set the order ID
                };
                await orderItemRepository.AddOrderItemAsync(newItem);
            }
        }

        // Remove old items that are not in the new items list
        var itemsToRemove = oldItems.Where(oi => !newItems.Any(ni => ni.OrderId == oi.OrderId && ni.ProductId == oi.ProductId));

        foreach (var item in itemsToRemove)
        {
            await orderItemRepository.DeleteOrderItemAsync(item.OrderId, item.ProductId);
        }

        orderRepository.UpdateOrderAsync(existingOrder);

        await orderItemRepository.SaveChangesAsync();
        await orderRepository.SaveChangesAsync();
    }
}
