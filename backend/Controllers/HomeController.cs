using System.Diagnostics;
using Docker.NetCore.MySql.Data;
using Docker.NetCore.MySql.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore;

namespace Docker.NetCore.MySql.Controllers
{
    public class HomeController : Controller
    {
        private readonly MySqlDbContext _context;

        public HomeController(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            List<MenuItem> menuItems = await _context.MenuItems.ToListAsync();
            return View(menuItems);
        }


        // GET: /HelloWorld/
        // public string Index()
        // {
        //     return "This is my default action...";
        // }
        
        // public IActionResult Index()
        // {
        //     return View();
        // }

        // public IActionResult Menu()
        // {
        //     // MenuItem menu = new MenuItem();

        //     // var items = menu.id;

        //     // var menuItem = await _context.MenuItems.SingleOrDefaultAsync(m => m.Id == 1);

        //     // var items = Data.MySqlDbContext.MenuItems.Take(1).Select(m => new MenuItem{ Id = m.Id }).ToList();


        //     ViewData["Message"] = "items";

        //     return View();
        // }

        // public IActionResult About()
        // {
        //     ViewData["Message"] = "Your application description page.";

        //     return View();
        // }

        // public IActionResult Contact()
        // {
        //     ViewData["Message"] = "Your contact page.";

        //     return View();
        // }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
