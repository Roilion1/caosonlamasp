using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CAOSONLAM1_2122110089.Data;
using CAOSONLAM1_2122110089.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CAOSONLAM1_2122110089.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<IActionResult> GetCartItems()
        {
            var carts = await _context.Carts
                .Select(c => new {
                    c.Id,
                    c.ProductId,
                    c.Quantity,
                    ProductName = _context.Products.FirstOrDefault(p => p.Id == c.ProductId).Name,
                    ProductImage = _context.Products.FirstOrDefault(p => p.Id == c.ProductId).Avata,
                    ProductPrice = _context.Products.FirstOrDefault(p => p.Id == c.ProductId).Price
                })
                .ToListAsync();

            return Ok(carts);
        }

        // GET: api/Cart/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartDTO>> GetCart(int id)
        {
            var cart = await _context.Carts
                .Where(c => c.Id == id)
                .Select(c => new CartDTO
                {
                    Id = c.Id,
                    ProductId = c.ProductId,
                    Quantity = c.Quantity
                })
                .FirstOrDefaultAsync();

            if (cart == null)
            {
                return NotFound(); 
            }

            return cart; 
        }

        // POST: api/Cart
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCart), new { id = cart.Id }, cart);
        }

        // PUT: api/Cart/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Carts.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
