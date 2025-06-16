using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

namespace Orders.Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private OrdersContext ordersContext;

        public OrderRepository(OrdersContext ordersContext)
        {
            this.ordersContext = ordersContext;
        }

        public async Task AddOrderAsync(Order order)
        {
            await ordersContext.Orders.AddAsync(order);
        }

        public async Task DeleteOrderAsync(int orderId)
        {
            var orderItems = ordersContext.OrderItems.Where(o => o.OrderId == orderId);
            ordersContext.OrderItems.RemoveRange(orderItems);

            var order = await ordersContext.Orders.FindAsync(orderId);
            if (order != null)
            {
                ordersContext.Orders.Remove(order);
            }
        }

        public async Task<Order?> GetOrderByIdAsync(int orderId)
        {
            return await ordersContext.Orders
                .Include(o => o.Client)
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task<IEnumerable<OrderSummary>> GetOrdersPaged(
            int pageIndex, int pageSize, string sortColumn, string sortDirection, string? filter = null)
        {
            var result = await ordersContext.OrderSummaries
                .FromSqlInterpolated(
                    $@"EXEC sp_GetOrdersPaged 
                        @PageIndex = {pageIndex}, 
                        @PageSize = {pageSize}, 
                        @SortColumn = {sortColumn}, 
                        @SortDirection = {sortDirection}, 
                        @Filter = {filter}")
                .ToListAsync();

            return result;
        }

        public void UpdateOrderAsync(Order order)
        {
            ordersContext.Update(order);
        }

        public async Task SaveChangesAsync()
        {
            await ordersContext.SaveChangesAsync();
        }
    }
}
