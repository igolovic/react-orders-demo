using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

namespace Orders.Infrastructure.Repositories
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly OrdersContext ordersContext;

        public OrderItemRepository(OrdersContext ordersContext)
        {
            this.ordersContext = ordersContext;
        }

        public async Task AddOrderItemAsync(OrderItem orderItem)
        {
            await ordersContext.OrderItems.AddAsync(orderItem);
        }

        public async Task DeleteOrderItemAsync(int orderId, int productId)
        {
            var orderItem = await ordersContext.OrderItems.FindAsync(orderId, productId);
            if (orderItem != null)
            {
                ordersContext.OrderItems.Remove(orderItem);
            }
        }

        public async Task<IEnumerable<OrderItem>> GetOrderItemsByOrderId(int orderId)
        {
            return await ordersContext.OrderItems
                .Where(orderItem => orderItem.OrderId == orderId)
                .ToListAsync();
        }

        public async Task SaveChangesAsync()
        {
            await ordersContext.SaveChangesAsync();
        }

        public async Task UpdateOrderItemAsync(OrderItem order)
        {
            ordersContext.OrderItems.Update(order);
            await SaveChangesAsync();
        }
    }
}
