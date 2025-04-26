using CAOSONLAM1_2122110089.Data;
using CAOSONLAM1_2122110089.Model;
using CAOSONLAM1_2122110089.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;

namespace CAOSONLAM1_2122110089.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext pro;
        private readonly JwtService _jwtService;

        public UserController(AppDbContext context, JwtService jwtService)
        {
            pro = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            if (pro.Users.Any(u => u.Email == model.Email))
                return BadRequest(new { error = "Email đã được sử dụng" });

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                Password = hashedPassword,
                Address = model.Address,
            };

            pro.Users.Add(user);
            await pro.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user.Email);

            return Ok(new { message = "Đăng ký thành công", token }); 
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await pro.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            // Kiểm tra mật khẩu có khớp không bằng cách dùng BCrypt để so sánh
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized(new { message = "Email hoặc mật khẩu không đúng." });

            // Tạo token bằng JwtService
            var token = _jwtService.GenerateToken(user.Email);

            return Ok(new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email,
                token = token
            });
        }
        [HttpGet("customerInfo")]
        [Authorize]
        public async Task<IActionResult> GetCustomerInfo()
        {
            var userEmail = User.Identity.Name;  // Lấy email từ token
            var user = await pro.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                return NotFound(new { message = "Không tìm thấy thông tin khách hàng." });
            }

            return Ok(new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email,
                phone = user.Phone,
                address = user.Address
            });
        }
    }
}
