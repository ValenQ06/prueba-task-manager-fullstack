using TaskManagerAPI.Data;
using TaskManagerAPI.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace TaskManagerAPI.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task DeleteUser(int id)
        {
            var hasTasks = await _context.Tasks.AnyAsync(t => t.UserId == id);

            if (hasTasks)
                throw new ApiException("User has tasks assigned");

            var user = await _context.Users.FindAsync(id);

            if (user == null)
                throw new ApiException("User not found", 404);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}
