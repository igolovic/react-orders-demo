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

    public async Task<OrderDto> Execute(OrderUpdateDto dto)
    {
        var existingOrder = await orderRepository.GetOrderByIdAsync(dto.OrderId);
        if (existingOrder == null)
            throw new Exception("Order not found.");

        existingOrder.ClientId = dto.ClientId;
        existingOrder.DateModified = DateTime.UtcNow;

        var oldItems = existingOrder.OrderItems.ToList();
        var newItems = dto.OrderItems;

        foreach (var item in newItems)
        {
            var existingItem = oldItems.FirstOrDefault(oi => oi.OrderItemId == item.OrderItemId);
            if (existingItem != null)
            {
                // Update if the item exists
                existingItem.ProductId = item.ProductId;
                existingItem.Quantity = item.Quantity;
                existingItem.UnitPriceOnCreatedDate = item.UnitPriceOnCreatedDate;
            }
            else
            {
                // Add new item if it doesn't exist in the old items
                var newItem = new OrderItem
                {
                    OrderItemId = 0,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    OrderId = existingOrder.OrderId,
                    UnitPriceOnCreatedDate = item.UnitPriceOnCreatedDate
                };
                await orderItemRepository.AddOrderItemAsync(newItem);
            }
        }

        // Remove old items that are not in the new items list
        var itemsToRemove = oldItems.Where(oi => !newItems.Any(ni => ni.OrderItemId == oi.OrderItemId));

        foreach (var item in itemsToRemove)
        {
            await orderItemRepository.DeleteOrderItemAsync(item.OrderId, item.ProductId);
        }

        orderRepository.UpdateOrderAsync(existingOrder);

        await orderItemRepository.SaveChangesAsync();
        await orderRepository.SaveChangesAsync();

        var updatedOrder = await orderRepository.GetOrderByIdAsync(existingOrder.OrderId);

        var orderDto = (OrderDto)updatedOrder;
        return orderDto;
    }
}
