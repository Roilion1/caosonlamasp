namespace CAOSONLAM1_2122110089.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }  
        public float Price { get; set; }
        public string Avata { get; set; }  


        public int CategoryId { get; set; }  

        // Thời gian tạo sản phẩm
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Thời gian cập nhật sản phẩm
        public DateTime? UpdatedAt { get; set; }

        // Thời gian xóa mềm (có thể null)
        public DateTime? DeletedAt { get; set; }
        public int StockQuantity { get; internal set; }
    }
}
