using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;

namespace Orders.Infrastructure;

public class OrdersContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    public OrdersContext(DbContextOptions<OrdersContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>()
            .HasMany(o => o.OrderItems)
            .WithOne(oi => oi.Order)
            .HasForeignKey(oi => oi.OrderId);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Product)
            .WithMany()
            .HasForeignKey(oi => oi.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<OrderItem>()
            .Property(oi => oi.UnitPriceOnCreatedDate)
            .HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Product>()
            .Property(p => p.UnitPrice)
            .HasColumnType("decimal(18,2)");

        base.OnModelCreating(modelBuilder);
    }
}
