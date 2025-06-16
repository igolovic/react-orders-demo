public class OrderUpdateDto
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public List<OrderItemDto> Items { get; set; }
}

