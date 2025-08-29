using Orders.Domain.Entities;

public class OrderDto
{
    public int OrderId { get; set; }
    public int ClientId { get; set; }
    public string? ClientName { get; set; }
    public DateTime? DateCreated { get; set; }
    public DateTime? DateModified { get; set; }
    public List<OrderItemDto> OrderItems { get; set; } = new();

    public static explicit operator OrderDto(Order order)
    {
        if (order == null) throw new ArgumentNullException(nameof(order));
        return new OrderDto
        {
            OrderId = order.OrderId,
            ClientId = order.ClientId,
            ClientName = order.Client?.Name,
            DateCreated = order.DateCreated,
            DateModified = order.DateModified,
            OrderItems = order.OrderItems?
                .Select(oi => (OrderItemDto)oi)
                .ToList() ?? new List<OrderItemDto>()
        };
    }
}
