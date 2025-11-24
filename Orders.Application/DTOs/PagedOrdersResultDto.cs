namespace Orders.Application.DTOs
{
    public class PagedOrdersResultDto
    {
        public int TotalCount { get; set; }
        public List<PagedOrderDto> Orders { get; set; } = new List<PagedOrderDto>();
    }
}