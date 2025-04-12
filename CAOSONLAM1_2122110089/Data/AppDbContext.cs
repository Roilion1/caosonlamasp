using CAOSONLAM1_2122110089.Model;
using Microsoft.EntityFrameworkCore;

namespace CAOSONLAM1_2122110089.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }  // Đổi DbSet tên là Categories

        public DbSet<User> Users { get; set; }

        // Phương thức OnModelCreating để đảm bảo tên bảng tương thích
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>().ToTable("Categorys");  
        }
    }
}
