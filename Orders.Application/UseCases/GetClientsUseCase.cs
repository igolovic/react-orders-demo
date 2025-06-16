using Orders.Application.DTOs;
using Orders.Domain.Interfaces;

public class GetClientsUseCase
{
    private readonly IClientRepository clientRepository;

    public GetClientsUseCase(IClientRepository clientRepository)
    {
        this.clientRepository = clientRepository;
    }

    public async Task<IEnumerable<ClientDto>> Execute()
    {
        var clients = await clientRepository.GetAllAsync();
        return clients.Select(c => new ClientDto { Id = c.Id, Name = c.Name });
    }
}
