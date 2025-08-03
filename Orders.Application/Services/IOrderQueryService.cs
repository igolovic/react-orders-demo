using Orders.Application.DTOs;

namespace Orders.Application.Services
{
    public interface IOrderQueryService
    {
        Task<IEnumerable<PagedOrderDto>> GetOrdersPaged(int pageIndex, int pageSize, string sortColumn, string sortDirection, string? filter = null);
    }
}
