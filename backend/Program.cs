﻿using Docker.NetCore.MySql.Data;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore;
// using Microsoft.ML;
// using Microsoft.ML.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

// builder.Services.AddDbContext<MySqlDbContext>(options =>
//   options.UseSqlServer(builder.Configuration.GetConnectionString("MySql")));

// For common usages, see pull request #1233.
var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));

// Replace 'MySqlDbContext' with the name of your own DbContext derived class.
builder.Services.AddDbContext<MySqlDbContext>(
    dbContextOptions => dbContextOptions
        .UseMySql(builder.Configuration.GetConnectionString("MySql"), serverVersion)
        // The following three options help with debugging, but should
        // be changed or removed for production.
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors()
);

// Console.WriteLine(builder.Configuration.GetConnectionString("MySql"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<MySqlDbContext>();
    // context.Database.Migrate();
    // context.Database.EnsureCreated();
    DbInitializer.Initialize(context);
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

// app.MapGet("/", (MySqlConnection connection) => {
//     var titles = new List<string>();

//     try
//     {
//         Console.WriteLine("Connecting to MySQL...");
//         connection.Open();

//         string sql = "SELECT title FROM MenuItem";
//         using var cmd = new MySqlCommand(sql, connection);
//         using MySqlDataReader reader = cmd.ExecuteReader();

//         while (reader.Read())
//         {
//             titles.Add(reader.GetString(0));
//         }
//         reader.Close();
//     }
//     catch (Exception ex)
//     {
//         return Results.Problem(detail: ex.ToString());
//     }
//     connection.Close();
    
//     return Results.Ok(titles);
// });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// app.MapPageRoute(
//     name: "default",
//     pattern: "{page=Home}/{action=Index}/{id?}");


// app.MapGet("/", () => View("~/Views/Home/index.cshtml"));

app.Run();