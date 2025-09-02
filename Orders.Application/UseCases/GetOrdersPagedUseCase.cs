using Orders.Application.DTOs;
using Orders.Application.Services;

namespace Orders.Application.UseCases
{
    public class GetOrdersPagedUseCase
    {
        private IOrderQueryService orderQueryService { get; set; }

        public GetOrdersPagedUseCase(IOrderQueryService orderQueryService)
        {
            this.orderQueryService = orderQueryService;
        }

        public async Task<PagedOrdersResultDto> Execute(int pageIndex, int pageSize, string sortColumn, string sortDirection, string? filter = null)
        {
            var ordersPagedResult = await orderQueryService.GetOrdersPaged(pageIndex, pageSize, sortColumn, sortDirection, filter);
            return ordersPagedResult;
        }
    }
}
