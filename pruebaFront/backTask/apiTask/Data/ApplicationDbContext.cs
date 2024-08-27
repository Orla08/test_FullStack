using Microsoft.EntityFrameworkCore;

namespace apiTask.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Define tus DbSets aquí. Ejemplo:
        public DbSet<TaskEntity> Tasks { get; set; }
    }
}
