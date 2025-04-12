using CAOSONLAM1_2122110089.Data;
using CAOSONLAM1_2122110089.Model;
using CAOSONLAM1_2122110089.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

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

            return Ok(new { message = "Đăng ký thành công", token }); // Trả token nhưng chưa đăng nhập
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login model)
        {
            var user = pro.Users.SingleOrDefault(u => u.Email == model.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                return Unauthorized(new { error = "Sai email hoặc mật khẩu" });

            var token = _jwtService.GenerateToken(user.Email);

            return Ok(new { message = "Đăng nhập thành công", token, user.Name, user.Email });
        }

    }
}
