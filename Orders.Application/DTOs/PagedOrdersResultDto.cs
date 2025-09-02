namespace Orders.Application.DTOs
{
    public class PagedOrdersResultDto
    {
        public int TotalCount { get; set; }
        public List<PagedOrderDto> PagedOrders { get; set; } = new List<PagedOrderDto>();
    }
}