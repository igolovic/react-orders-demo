namespace Orders.Application.DTOs
{
    public class PagedOrderDto
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string ClientName { get; set; } = string.Empty;
    }
}