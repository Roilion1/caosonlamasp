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
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            // Trả về danh sách đơn hàng mà không cần OrderDetails
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.Id == id); // Không cần Include OrderDetails

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // POST: api/Order
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder([FromBody] OrderDTO orderDto)
        {
            if (orderDto.TotalAmount <= 0 || orderDto.OrderDetails == null || !orderDto.OrderDetails.Any())
            {
                return BadRequest("Thông tin đơn hàng không hợp lệ.");
            }

            // Tạo đối tượng Order mới
            var order = new Order
            {
                UserId = orderDto.UserId,
                OrderDate = DateTime.Now,
                TotalAmount = orderDto.TotalAmount,
                OrderDetails = new List<OrderDetail>()
            };

            foreach (var detailDto in orderDto.OrderDetails)
            {
                var product = await _context.Products.FindAsync(detailDto.ProductId);
                if (product == null)
                {
                    return BadRequest($"Sản phẩm có ID {detailDto.ProductId} không tồn tại.");
                }

                order.OrderDetails.Add(new OrderDetail
                {
                    ProductId = detailDto.ProductId,
                    Quantity = detailDto.Quantity,
                    UnitPrice = (decimal)product.Price 
                });
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // PUT: api/Order/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Orders.Any(e => e.Id == id))
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

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
