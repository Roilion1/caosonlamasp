namespace CAOSONLAM1_2122110089.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Avata { get; set; }

        //// Thời gian tạo sản phẩm
        //public DateTime CreatedAt { get; set; } = DateTime.Now;

        //// Thời gian cập nhật sản phẩm
        //public DateTime? UpdatedAt { get; set; }

        //// Thời gian xóa mềm (có thể null)
        //public DateTime? DeletedAt { get; set; }

    }
}
