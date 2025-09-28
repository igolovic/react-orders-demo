using Microsoft.EntityFrameworkCore;
using Orders.Application.DTOs;
using Orders.Application.Services;

namespace Orders.Infrastructure.OrderQueryService
{
    public class OrderQueryService : IOrderQueryService
    {
        private readonly OrdersContext ordersContext;

        public OrderQueryService(OrdersContext ordersContext)
        {
            this.ordersContext = ordersContext;
        }

        public async Task<PagedOrdersResultDto> GetOrdersPaged(
            int pageIndex,
            int pageSize,
            string sortColumn,
            string sortDirection,
            string? filter = null)
        {
            // Base query: join Orders, Clients, and OrderItems, with optional filter
            var query = ordersContext.Orders
                .Include(o => o.Client)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter))
            {
                query = query.Where(o =>
                    o.Client != null && o.Client.Name.Contains(filter));
            }

            // Sorting
            // Default sort: DateCreated descending
            bool descending = sortDirection?.ToLower() == "desc";
            query = sortColumn?.ToLower() switch
            {
                "clientname" => descending
                    ? query.OrderByDescending(o => o.Client.Name)
                    : query.OrderBy(o => o.Client.Name),
                "datecreated" => descending
                    ? query.OrderByDescending(o => o.DateCreated)
                    : query.OrderBy(o => o.DateCreated),
                _ => query.OrderByDescending(o => o.DateCreated)
            };

            // Total count before paging
            int totalCount = await query.CountAsync();

            // Paging
            var pagedOrders = await query
                .Skip(pageIndex * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Map to DTOs
            var pagedOrderDtos = pagedOrders.Select(o => new PagedOrderDto
            {
                OrderId = o.OrderId,
                DateCreated = o.DateCreated,
                DateModified = o.DateModified,
                ClientId = o.ClientId,
                ClientName = o.Client?.Name,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                {
                    OrderItemId = oi.OrderItemId,
                    OrderId = oi.OrderId,
                    ProductId = oi.ProductId,
                    ProductName = oi.Product?.Name,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.Product?.UnitPrice ?? 0m
                }).ToList()
            }).ToList();

            return new PagedOrdersResultDto
            {
                TotalCount = totalCount,
                PagedOrders = pagedOrderDtos
            };
        }
    }
}
