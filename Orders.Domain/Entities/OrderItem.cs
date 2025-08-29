using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Orders.Domain.Entities
{
    public class OrderItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderItemId { get; set; }
        public required int OrderId { get; set; }
        public required int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPriceOnCreatedDate { get; set; }
        public Order? Order { get; set; }
        public Product? Product { get; set; }
    }
}