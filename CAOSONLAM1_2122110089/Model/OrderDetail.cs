﻿using CAOSONLAM1_2122110089.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class OrderDetail
{
    [Key]
    public int Id { get; set; }

    public int OrderId { get; set; }
    public Order Order { get; set; }

    public int ProductId { get; set; }
    public Product Product { get; set; }

    public int Quantity { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal UnitPrice { get; set; }
}
