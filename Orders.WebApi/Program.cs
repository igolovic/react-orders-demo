using Microsoft.EntityFrameworkCore;
using Orders.Application.UseCases;
using Orders.Domain.Interfaces;
using Orders.Infrastructure;
using Orders.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<OrdersContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<GetOrdersPagedUseCase>();
builder.Services.AddScoped<AddOrderUseCase>();
builder.Services.AddScoped<UpdateOrderUseCase>();
builder.Services.AddScoped<DeleteOrderUseCase>();

builder.Services.AddScoped<GetProductsUseCase>();

builder.Services.AddScoped<GetClientsUseCase>();

builder.Services.AddScoped<GetOrderItemsUseCase>();
builder.Services.AddScoped<AddOrderItemUseCase>();
builder.Services.AddScoped<UpdateOrderItemUseCase>();
builder.Services.AddScoped<DeleteOrderItemUseCase>();

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers();
app.UseHttpsRedirection();

app.Run();