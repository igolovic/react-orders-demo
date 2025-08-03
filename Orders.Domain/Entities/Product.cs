namespace Orders.Domain.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public required string Name { get; set; }
        public required decimal UnitPrice { get; set; }
    }
}
