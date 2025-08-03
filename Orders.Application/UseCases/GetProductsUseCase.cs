using Orders.Application.DTOs;
using Orders.Domain.Interfaces;

public class GetProductsUseCase
{
    private readonly IProductRepository productRepository;

    public GetProductsUseCase(IProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    public async Task<IEnumerable<ProductDto>> Execute()
    {
        var products = await productRepository.GetAllAsync();
        return products.Select(p => new ProductDto { ProductId = p.ProductId, Name = p.Name, UnitPrice = p.UnitPrice });
    }
}
