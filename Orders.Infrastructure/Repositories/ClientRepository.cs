using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;
using Orders.Domain.Interfaces;

namespace Orders.Infrastructure.Repositories
{
    internal class ClientRepository : IClientRepository
    {
        private OrdersContext ordersContext;

        public ClientRepository(OrdersContext ordersContext)
        {
            this.ordersContext = ordersContext;
        }

        public async Task<IEnumerable<Client>> GetAllAsync()
        {
            var clients = from c in ordersContext.Clients
                          select c;

            return await clients.ToListAsync();
        }
    }
}
