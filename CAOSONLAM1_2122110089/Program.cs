﻿
//using CAOSONLAM1_2122110089.Data;
//using Microsoft.EntityFrameworkCore;

//namespace CAOSONLAM1_2122110089
//{
//    public class Program
//    {
//        public static void Main(string[] args)
//        {
//            var builder = WebApplication.CreateBuilder(args);

//            // 🛠️ Thêm dịch vụ Controller
//            builder.Services.AddControllers();

//            // Add services to the container.
//            builder.Services.AddAuthorization();

//            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//            builder.Services.AddEndpointsApiExplorer();
//            builder.Services.AddSwaggerGen();

//            builder.Services.AddDbContext<AppDbContext>(options =>
//            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//            var app = builder.Build();

//            // Configure the HTTP request pipeline.
//            if (app.Environment.IsDevelopment())
//            {
//                app.UseSwagger();
//                app.UseSwaggerUI();
//            }

//            app.UseHttpsRedirection();

//            app.UseAuthorization();

//            var summaries = new[]
//            {
//                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
//            };

//            app.MapGet("/weatherforecast", (HttpContext httpContext) =>
//            {
//                var forecast = Enumerable.Range(1, 5).Select(index =>
//                    new WeatherForecast
//                    {
//                        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//                        TemperatureC = Random.Shared.Next(-20, 55),
//                        Summary = summaries[Random.Shared.Next(summaries.Length)]
//                    })
//                    .ToArray();
//                return forecast;
//            })
//            .WithName("GetWeatherForecast")
//            .WithOpenApi();

//            app.Run();
//        }
//    }
//}
using CAOSONLAM1_2122110089.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
