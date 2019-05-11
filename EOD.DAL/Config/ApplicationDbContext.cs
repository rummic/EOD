namespace EOD.DAL.Config
{
    using EOD.DAL.Model;
    using System;
    using Microsoft.EntityFrameworkCore;

    public class ApplicationDbContext : DbContext
    {
        public DbSet<Case> Cases { get; set; }
        public DbSet<Case> Departments { get; set; }
        public DbSet<Case> Documents { get; set; }
        public DbSet<Case> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(@"Server=(LocalDb)\MSSQLLocalDb;Database=EOD;Trusted_Connection=True;");   
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
