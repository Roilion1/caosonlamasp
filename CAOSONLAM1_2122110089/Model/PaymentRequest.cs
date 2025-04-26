namespace CAOSONLAM1_2122110089.Model
{
    public class PaymentRequest
    {
        public string UserEmail { get; set; }  // Email người dùng
        public List<int> ProductIds { get; set; }  // Danh sách ID sản phẩm đã chọn
    }
}
