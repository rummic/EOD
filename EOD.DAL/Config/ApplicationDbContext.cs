namespace EOD.DAL.Config
{
    using EOD.DAL.Model;
    using System;
    using Microsoft.EntityFrameworkCore;

    public class ApplicationDbContext : DbContext
    {
        public DbSet<Case> Cases { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DocumentType> DocumentTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(@"Server=(LocalDb)\MSSQLLocalDb;Database=EOD;Trusted_Connection=True;");   
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
