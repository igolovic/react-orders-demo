using Orders.Domain.Entities;

namespace Orders.Domain.Interfaces
{
    public interface IOrderRepository
    {
        Task AddOrderAsync(Order order);
        void UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(int orderId);
        Task<Order?> GetOrderByIdAsync(int orderId);
        Task<IEnumerable<OrderSummary>> GetOrdersPaged(int pageIndex, int pageSize, string sortColumn, string sortDirection, string filter);
        Task SaveChangesAsync();
    }
}