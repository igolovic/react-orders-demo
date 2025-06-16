using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;

namespace Orders.Infrastructure;

public class OrdersContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<OrderSummary> OrderSummaries => Set<OrderSummary>();

    public OrdersContext(DbContextOptions<DbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<OrderSummary>().HasNoKey();

        // Products
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "usb stick", UnitPrice = 9.99m },
            new Product { Id = 2, Name = "laptop", UnitPrice = 1234.99m },
            new Product { Id = 3, Name = "Produkt A", UnitPrice = 19.99m },
            new Product { Id = 4, Name = "Produkt B", UnitPrice = 5.49m },
            new Product { Id = 5, Name = "Produkt C", UnitPrice = 99.95m },
            new Product { Id = 6, Name = "Produkt A", UnitPrice = 19.99m },
            new Product { Id = 7, Name = "Produkt B", UnitPrice = 5.49m },
            new Product { Id = 8, Name = "Produkt C", UnitPrice = 99.95m },
            new Product { Id = 9, Name = "Produkt A", UnitPrice = 19.99m },
            new Product { Id = 10, Name = "Produkt B", UnitPrice = 5.49m },
            new Product { Id = 11, Name = "Produkt C", UnitPrice = 99.95m },
            new Product { Id = 12, Name = "Produkt A", UnitPrice = 19.99m },
            new Product { Id = 13, Name = "Produkt B", UnitPrice = 5.49m },
            new Product { Id = 14, Name = "Produkt C", UnitPrice = 99.95m },
            new Product { Id = 15, Name = "Produkt A", UnitPrice = 19.99m },
            new Product { Id = 16, Name = "Produkt B", UnitPrice = 5.49m },
            new Product { Id = 17, Name = "Produkt C", UnitPrice = 99.95m }
        );

        // Orders
        modelBuilder.Entity<Order>().HasData(
            new Order { Id = 1, DateCreated = new DateTime(2025, 5, 30, 14, 7, 13), DateModified = new DateTime(2025, 6, 4, 14, 7, 13), Client = "Müller GmbH", Comment = "Erste Bestellung" },
            new Order { Id = 2, DateCreated = new DateTime(2025, 5, 31, 14, 7, 13), DateModified = new DateTime(2025, 6, 6, 14, 7, 13), Client = "Testkunde", Comment = "Kommentar 1" },
            new Order { Id = 3, DateCreated = new DateTime(2025, 6, 1, 14, 7, 13), DateModified = new DateTime(2025, 6, 7, 14, 7, 13), Client = "", Comment = "Kommentar 2" },
            new Order { Id = 4, DateCreated = new DateTime(2025, 6, 2, 14, 7, 13), DateModified = new DateTime(2025, 6, 8, 14, 7, 13), Client = "Schnecke-Farm GmbH", Comment = "Kommentar 3" },
            new Order { Id = 5, DateCreated = new DateTime(2025, 6, 3, 14, 7, 13), DateModified = new DateTime(2025, 6, 9, 14, 7, 13), Client = "Mueller AG", Comment = "Letzte Bestellung" },
            new Order { Id = 6, DateCreated = new DateTime(2025, 6, 4, 14, 7, 13), DateModified = new DateTime(2025, 6, 9, 14, 7, 13), Client = "Anderer Kunde", Comment = "Kommentar 4" }
        );

        // OrderItems
        modelBuilder.Entity<OrderItem>().HasData(
            new OrderItem { OrderId = 1, ProductId = 1, Quantity = 2 },
            new OrderItem { OrderId = 1, ProductId = 2, Quantity = 5 },
            new OrderItem { OrderId = 2, ProductId = 3, Quantity = 1 },
            new OrderItem { OrderId = 3, ProductId = 1, Quantity = 3 },
            new OrderItem { OrderId = 4, ProductId = 2, Quantity = 4 },
            new OrderItem { OrderId = 5, ProductId = 3, Quantity = 2 },
            new OrderItem { OrderId = 6, ProductId = 1, Quantity = 1 }
        );
    }

}
