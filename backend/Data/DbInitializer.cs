using System.Linq;
using Docker.NetCore.MySql.Models;
using Microsoft.EntityFrameworkCore;

namespace Docker.NetCore.MySql.Data
{
    public class DbInitializer
    {
        public static void Initialize(MySqlDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.MenuItems.Any())
            {
                return;
            }

            var menuItems = new MenuItem[]
            {
                new MenuItem{Name="Item 1",Url="url_1"},
                new MenuItem{Name="Item 2",Url="url_2"},
                new MenuItem{Name="Item 3",Url="url_3"},
                new MenuItem{Name="Item 4",Url="url_4"}
            };

            context.MenuItems.AddRange(menuItems);

            context.SaveChanges();
        }
    }
}
