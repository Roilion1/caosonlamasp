using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using CAOSONLAM1_2122110089.Data;
using CAOSONLAM1_2122110089.Model;
using System.IO;

namespace CAOSONLAM1_2122110089.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext pro;

        public ProductController(AppDbContext context)
        {
            pro = context;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await (from p in pro.Products
                              join c in pro.Categories on p.CategoryId equals c.Id
                              select new
                              {
                                  p.Id,
                                  p.Name,
                                  p.Description,
                                  p.Price,
                                  p.Avata,
                                  p.CategoryId,
                                  CategoryName = c.Name,
                                  p.CreatedAt,
                                  p.UpdatedAt,
                                  p.DeletedAt,
                                  p.StockQuantity
                              }).ToListAsync();

            return Ok(data);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await (from p in pro.Products
                                 join c in pro.Categories on p.CategoryId equals c.Id
                                 where p.Id == id
                                 select new
                                 {
                                     p.Id,
                                     p.Name,
                                     p.Description,
                                     p.Price,
                                     p.Avata,
                                     p.CategoryId,
                                     CategoryName = c.Name,
                                     p.CreatedAt,
                                     p.UpdatedAt,
                                     p.DeletedAt,
                                     p.StockQuantity
                                 }).FirstOrDefaultAsync();

            if (product == null) return NotFound();
            return Ok(product);
        }


        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            if (product == null || product.CategoryId == 0) 
                return BadRequest("Invalid product data or missing category.");

            // Kiểm tra xem Category có tồn tại không
            var category = await pro.Categories.FindAsync(product.CategoryId);
            if (category == null) return NotFound("Category not found");

            // Lưu sản phẩm vào cơ sở dữ liệu
            pro.Products.Add(product);
            await pro.SaveChangesAsync();

            // Trả về sản phẩm đã được tạo với thông tin chính xác
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }


        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product product)
        {
            var existing = await pro.Products.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = product.Name;
            existing.Price = product.Price;
            existing.Avata = product.Avata;

            pro.Products.Update(existing);
            await pro.SaveChangesAsync();
            return Ok(existing);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await pro.Products.FindAsync(id);
            if (product == null) return NotFound();

            pro.Products.Remove(product);
            await pro.SaveChangesAsync();
            return Ok(new { message = "Deleted successfully" });
        }

        // Phương thức tải hình ảnh
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            // Tạo tên file duy nhất
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", fileName); // Lưu vào thư mục Images

            // Tạo thư mục nếu chưa có
            Directory.CreateDirectory(Path.GetDirectoryName(filePath));

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Trả về đường dẫn URL để dùng cho sản phẩm
            var imageUrl = $"{Request.Scheme}://{Request.Host}/Images/{fileName}"; 
            return Ok(new { imageUrl });
        }

    }
}