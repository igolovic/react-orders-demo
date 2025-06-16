namespace Orders.Application.DTOs
{
    public class OrderViewDto
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
    }
}
