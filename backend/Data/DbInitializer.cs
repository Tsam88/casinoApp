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
                new MenuItem{Name="Slots",Order=1,Url="#"},
                new MenuItem{Name="Software",Order=2,Url="#"},
                new MenuItem{Name="Bonuses",Order=3,Url="#"},
                new MenuItem{Name="News",Order=4,Url="#"},
                new MenuItem{Name="Blackjack",Order=5,Url="#"},
                new MenuItem{Name="Roullete",Order=6,Url="#"},
                new MenuItem{Name="Live Casino",Order=7,Url="#"},
                new MenuItem{Name="Poker",Order=8,Url="#"},
                new MenuItem{Name="Extra",Order=9,Url="#"}
            };

            context.MenuItems.AddRange(menuItems);

            var bookmakers = new Bookmaker[]
            {
                new Bookmaker{
                    Name="Unibet Casino",
                    Code="GG11AB76GH98P0007QQ",
                    Price=99.99M,
                    ButtonText="Activeaza Bonusul",
                    Description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                    Logo="/wwwroot/images/unibet_casino.png",
                    Url="https://wavefitnessproject.gr/",
                    Primary=false
                },
                new Bookmaker{
                    Name="Paddypower Casino",
                    Code="GG11AB76GH98P0007QQ",
                    Price=500,
                    ButtonText="Activeaza Bonusul",
                    Description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                    Logo="/wwwroot/images/paddypower_casino.png",
                    Url="https://wavefitnessproject.gr/",
                    Primary=true
                },
                new Bookmaker{
                    Name="Betano Casino",
                    Code="GG11AB76GH98P0007QQ",
                    Price=500,
                    ButtonText="Activeaza Bonusul",
                    Description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                    Logo="/wwwroot/images/betano_casino.png",
                    Url="https://wavefitnessproject.gr/",
                    Primary=false
                },
                new Bookmaker{
                    Name="Tsam Casino",
                    Code="GG11AB76GH98P0007QQ",
                    Price=250,
                    ButtonText="Activeaza Bonusul",
                    Description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                    Logo="/wwwroot/images/tsam_casino.png",
                    Url="https://wavefitnessproject.gr/",
                    Primary=false
                }
            };

            context.Bookmakers.AddRange(bookmakers);

            context.SaveChanges();
        }
    }
}
