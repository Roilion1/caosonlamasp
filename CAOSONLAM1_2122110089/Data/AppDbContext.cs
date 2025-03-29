using CAOSONLAM1_2122110089.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace CAOSONLAM1_2122110089.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categorys { get; set; }

    }
}
