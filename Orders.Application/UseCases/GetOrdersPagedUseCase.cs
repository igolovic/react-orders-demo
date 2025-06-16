using Orders.Application.DTOs;
using Orders.Domain.Interfaces;

namespace Orders.Application.UseCases
{
    public class GetOrdersPagedUseCase
    {
        private IOrderRepository orderRepository { get; set; }

        public GetOrdersPagedUseCase(IOrderRepository orderRepository)
        {
            this.orderRepository = orderRepository;
        }

        public async Task<IEnumerable<PagedOrderDto>> Execute(int pageIndex, int pageSize, string sortColumn, string sortDirection, string filter)
        {
            var orderSummaries = await orderRepository.GetOrdersPaged(pageIndex, pageSize, sortColumn, sortDirection, filter);
            return orderSummaries.Select(os => new PagedOrderDto
            {
                Id = os.Id,
                DateCreated = os.DateCreated,
                DateModified = os.DateModified,
                ClientName = os.ClientName
            });
        }
    }
}
