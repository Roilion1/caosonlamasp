namespace CAOSONLAM1_2122110089.Model
{
    public class OrderDTO
    {
        public int UserId { get; set; }
        public decimal TotalAmount { get; set; }
        public List<OrderDetailDTO> OrderDetails { get; set; }
    }
}
