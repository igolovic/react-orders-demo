using Orders.Domain.Entities;

public class OrderItemDto
{
    public int OrderItemId { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public string? ProductName { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    public static explicit operator OrderItemDto(OrderItem item)
    {
        if (item == null) throw new ArgumentNullException(nameof(item));
        return new OrderItemDto
        {
            OrderItemId = item.OrderItemId,
            OrderId = item.OrderId,
            ProductId = item.ProductId,
            ProductName = item.Product?.Name,
            Quantity = item.Quantity,
            UnitPrice = item.Product?.UnitPrice ?? 0m
        };
    }
}
