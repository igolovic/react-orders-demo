namespace Orders.Application.DTOs
{
    public class PagedOrderDto
    {
        public int OrderId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public int ClientId { get; set; }
        public string? ClientName { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
    }
}