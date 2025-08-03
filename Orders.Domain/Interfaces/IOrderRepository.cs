using Orders.Domain.Entities;

namespace Orders.Domain.Interfaces
{
    public interface IOrderRepository
    {
        Task AddOrderAsync(Order order);
        void UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(int orderId);
        Task<Order?> GetOrderByIdAsync(int orderId);
        Task SaveChangesAsync();
    }
}