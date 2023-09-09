using Docker.NetCore.MySql.Models;
using Microsoft.EntityFrameworkCore;


namespace Docker.NetCore.MySql.Data
{
    public class MySqlDbContext : DbContext
    {
        public MySqlDbContext (DbContextOptions<MySqlDbContext> options) : base(options)
        {
        }

        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Bookmaker> Bookmakers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MenuItem>().ToTable("MenuItem");
            modelBuilder.Entity<Bookmaker>().ToTable("Bookmaker");
        }
    }
}
