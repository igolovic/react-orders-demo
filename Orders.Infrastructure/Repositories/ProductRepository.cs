using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

namespace Orders.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private OrdersContext ordersContext;

        public ProductRepository(OrdersContext ordersContext)
        {
            this.ordersContext = ordersContext;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            var products = from p in ordersContext.Products
                           select p;

            return await products.ToListAsync();
        }
    }
}
