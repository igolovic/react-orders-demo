using Microsoft.Data.SqlClient;
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

        public async Task<IEnumerable<PagedOrderDto>> GetOrdersPaged(int pageIndex, int pageSize, string sortColumn, string sortDirection, string? filter = null)
        {
            var pagedOrders = new List<PagedOrderDto>();
            var orderItems = new List<OrderItemDto>();

            var conn = ordersContext.Database.GetDbConnection();
            await using (conn)
            {
                await conn.OpenAsync();

                using var cmd = conn.CreateCommand();
                cmd.CommandText = "sp_GetOrdersPaged";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@PageIndex", pageIndex));
                cmd.Parameters.Add(new SqlParameter("@PageSize", pageSize));
                cmd.Parameters.Add(new SqlParameter("@SortColumn", sortColumn));
                cmd.Parameters.Add(new SqlParameter("@SortDirection", sortDirection));
                cmd.Parameters.Add(new SqlParameter("@Filter", (object?)filter ?? DBNull.Value));

                using var reader = await cmd.ExecuteReaderAsync();

                // 1st result set: Orders
                while (await reader.ReadAsync())
                {
                    pagedOrders.Add(new PagedOrderDto
                    {
                        OrderId = reader.GetInt32(reader.GetOrdinal(nameof(PagedOrderDto.OrderId))),
                        DateCreated = reader.IsDBNull(reader.GetOrdinal(nameof(PagedOrderDto.DateCreated))) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal(nameof(PagedOrderDto.DateCreated))),
                        DateModified = reader.IsDBNull(reader.GetOrdinal(nameof(PagedOrderDto.DateModified)))
                        ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal(nameof(PagedOrderDto.DateModified))),
                        ClientId = reader.GetInt32(reader.GetOrdinal(nameof(PagedOrderDto.ClientId))),
                        ClientName = reader.GetString(reader.GetOrdinal(nameof(PagedOrderDto.ClientName))),
                        OrderItems = new List<OrderItemDto>()
                    });
                }

                // 2nd result set: OrderItems
                if (await reader.NextResultAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        orderItems.Add(new OrderItemDto
                        {
                            OrderItemId = reader.GetInt32(reader.GetOrdinal(nameof(OrderItemDto.OrderItemId))),
                            OrderId = reader.GetInt32(reader.GetOrdinal(nameof(OrderItemDto.OrderId))),
                            ProductId = reader.GetInt32(reader.GetOrdinal(nameof(OrderItemDto.ProductId))),
                            ProductName = reader.GetString(reader.GetOrdinal(nameof(OrderItemDto.ProductName))),
                            Quantity = reader.GetInt32(reader.GetOrdinal(nameof(OrderItemDto.Quantity))),
                            UnitPriceOnCreatedDate = reader.GetDecimal(reader.GetOrdinal(nameof(OrderItemDto.UnitPriceOnCreatedDate)))
                        });
                    }
                }
            }

            // Map order items to their orders
            var orderDict = pagedOrders.ToDictionary(o => o.OrderId);
            foreach (var orderItem in orderItems)
            {
                if (orderDict.TryGetValue(orderItem.OrderId, out var pagedOrder))
                {
                    pagedOrder.OrderItems.Add(orderItem);
                }
            }

            return pagedOrders;
        }
    }
}
