using System.ComponentModel.DataAnnotations.Schema;

namespace CAOSONLAM1_2122110089.Model
{
    public class Cart
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }
    }
}
