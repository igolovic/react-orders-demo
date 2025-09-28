using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;

namespace Orders.Infrastructure
{
    public static class OrdersContextSeed
    {
        public static void SeedData(ModelBuilder modelBuilder)
        {
            // Clients
            modelBuilder.Entity<Client>().HasData(
                new Client { ClientId = 1, Name = "Müller GmbH" },
                new Client { ClientId = 2, Name = "Testkunde" },
                new Client { ClientId = 3, Name = "Schnecke-Farm GmbH" },
                new Client { ClientId = 4, Name = "Mueller AG" },
                new Client { ClientId = 5, Name = "Anderer Kunde" }
            );

            // Products
            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = 1, Name = "usb stick", UnitPrice = 9.99m },
                new Product { ProductId = 2, Name = "laptop", UnitPrice = 1234.99m },
                new Product { ProductId = 3, Name = "Produkt A", UnitPrice = 19.99m },
                new Product { ProductId = 4, Name = "Produkt B", UnitPrice = 5.49m },
                new Product { ProductId = 5, Name = "Produkt C", UnitPrice = 99.95m },
                new Product { ProductId = 6, Name = "Produkt D", UnitPrice = 19.99m },
                new Product { ProductId = 7, Name = "Produkt E", UnitPrice = 5.49m }
            );

            // Orders
            modelBuilder.Entity<Order>().HasData(
                new Order { OrderId = 35, DateCreated = DateTime.Parse("2025-09-05T23:37:43.570"), DateModified = DateTime.Parse("2025-09-05T23:38:50.840"), ClientId = 1 },
                new Order { OrderId = 36, DateCreated = DateTime.Parse("2025-09-06T00:26:39.233"), DateModified = DateTime.Parse("2025-09-06T01:08:14.287"), ClientId = 2 },
                new Order { OrderId = 37, DateCreated = DateTime.Parse("2025-09-06T00:48:50.253"), DateModified = DateTime.Parse("2025-09-06T01:18:40.037"), ClientId = 2 },
                new Order { OrderId = 38, DateCreated = DateTime.Parse("2025-09-06T01:19:21.777"), DateModified = null, ClientId = 4 }
            );

            // OrderItems
            modelBuilder.Entity<OrderItem>().HasData(
                new OrderItem { OrderItemId = 60, OrderId = 35, ProductId = 1, Quantity = 1 },
                new OrderItem { OrderItemId = 61, OrderId = 35, ProductId = 2, Quantity = 3 },
                new OrderItem { OrderItemId = 62, OrderId = 35, ProductId = 3, Quantity = 5 },
                new OrderItem { OrderItemId = 63, OrderId = 36, ProductId = 3, Quantity = 2 },
                new OrderItem { OrderItemId = 64, OrderId = 36, ProductId = 4, Quantity = 2 },
                new OrderItem { OrderItemId = 68, OrderId = 37, ProductId = 4, Quantity = 100 },
                new OrderItem { OrderItemId = 72, OrderId = 38, ProductId = 1, Quantity = 1 },
                new OrderItem { OrderItemId = 73, OrderId = 38, ProductId = 2, Quantity = 333 }
            );
        }
    }
}
