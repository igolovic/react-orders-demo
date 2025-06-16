namespace Orders.Domain.Entities
{
    public class OrderItem
    {
        public required int OrderId { get; set; }
        public required int ProductId { get; set; }
        public int Quantity { get; set; }
        public Order? Order { get; set; }
        public Product? Product { get; set; }
    }
}