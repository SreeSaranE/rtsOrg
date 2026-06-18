using Microsoft.EntityFrameworkCore;

using backend.data.Context;
using backend.data.Interfaces;
using backend.data.Repositories;

using backend.Service.Interfaces;
using backend.Service.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

app.MapControllers();

app.Run();
