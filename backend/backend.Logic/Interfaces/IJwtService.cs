using backend.Models;

namespace backend.Service.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
