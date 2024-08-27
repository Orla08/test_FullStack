using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace WebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options ) : base(options) { }

        public DbSet<EmployeEntity> Employees { get; set; }

       

    }
}
