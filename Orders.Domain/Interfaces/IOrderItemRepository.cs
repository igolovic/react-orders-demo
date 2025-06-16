using Orders.Domain.Entities;

namespace Orders.Domain.Interfaces
{
    public interface IOrderItemRepository
    {
        Task AddOrderItemAsync(OrderItem order);
        Task UpdateOrderItemAsync(OrderItem order);
        Task DeleteOrderItemAsync(int orderId, int productId);
        Task<IEnumerable<OrderItem>> GetOrderItemsByOrderId(int orderId);
        Task SaveChangesAsync();
    }
}