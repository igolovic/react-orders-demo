using System.ComponentModel.DataAnnotations;

namespace Orders.Domain.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public required int ClientId { get; set; }

        public Client? Client { get; set; }
        public List<OrderItem> Items { get; set; } = new();
    }
}
