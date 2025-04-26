using CAOSONLAM1_2122110089.Model;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Order
{
    [Key] // Chỉ định Id là khóa chính
    public int Id { get; set; }

    // Mối quan hệ với User
    public int UserId { get; set; }
    public User User { get; set; } // Quan hệ với User

    // OrderDate thay vì CreatedAt
    public DateTime OrderDate { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }

    // Quan hệ với OrderDetail
    public ICollection<OrderDetail> OrderDetails { get; set; }
}
