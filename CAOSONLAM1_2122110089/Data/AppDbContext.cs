using CAOSONLAM1_2122110089.Model;
using Microsoft.EntityFrameworkCore;

namespace CAOSONLAM1_2122110089.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>().ToTable("Categories");

            modelBuilder.Entity<Product>()
                .HasOne<Category>()
                .WithMany()
                .HasForeignKey(p => p.CategoryId)
                .HasConstraintName("FK_Products_Categories_CategoryId");

            modelBuilder.Entity<Cart>()
                .HasOne<Product>()
                .WithMany()
                .HasForeignKey(c => c.ProductId)
                .HasConstraintName("FK_Carts_Products_ProductId");

            // Order and OrderDetail relationship
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderId)
                .OnDelete(DeleteBehavior.Restrict)  
                .HasConstraintName("FK_OrderDetails_Orders_OrderId");

            // OrderDetail and Product relationship
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Product)
                .WithMany()
                .HasForeignKey(od => od.ProductId)
                .OnDelete(DeleteBehavior.Restrict)  // Đảm bảo không cascade khi xóa
                .HasConstraintName("FK_OrderDetails_Products_ProductId");

            // Order và User relationship
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany()
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade)  // Khi User bị xóa, tất cả các Order sẽ bị xóa
                .HasConstraintName("FK_Orders_Users_UserId");
        }
    }
}
