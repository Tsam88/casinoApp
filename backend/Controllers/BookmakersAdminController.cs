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
    public class BookmakersAdminController : Controller
    {
        //  /BookmakersAdmin/BookmakersList
        public IActionResult BookmakersList()
        {
            return View();
        }

        //  /BookmakersAdmin/BookmakersForm
        public IActionResult BookmakersForm()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
