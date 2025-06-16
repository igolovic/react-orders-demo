namespace Orders.Domain.Entities
{
    public class OrderSummary
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string ClientName { get; set; } = string.Empty;
    }
}
