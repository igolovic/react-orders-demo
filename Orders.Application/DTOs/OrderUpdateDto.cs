public class OrderUpdateDto
{
    public int OrderId { get; set; }
    public int ClientId { get; set; }
    public DateTime DateCreated { get; set; }
    public List<OrderItemDto>? OrderItems { get; set; }
}

