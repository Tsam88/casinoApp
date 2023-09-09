using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Docker.NetCore.MySql.Data;
using Docker.NetCore.MySql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore;

namespace Docker.NetCore.MySql.Controllers
{
    [Produces("application/json")]
    [Route("api/MenuItems")]
    public class MenuItemsController : Controller
    {
        private readonly Data.MySqlDbContext _context;

        public MenuItemsController(Data.MySqlDbContext context)
        {
            _context = context;
        }

        // GET: api/MenuItems
        [HttpGet]
        public IEnumerable<MenuItem> GetMenuItem()
        {
            return _context.MenuItems.OrderBy(m => m.Order);
        }

        // GET: api/MenuItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMenuItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var menuItem = await _context.MenuItems.SingleOrDefaultAsync(m => m.Id == id);

            if (menuItem == null)
            {
                return NotFound();
            }

            return Ok(menuItem);
        }

        // PUT: api/MenuItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuItem([FromRoute] int id, [FromBody] MenuItem menuItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != menuItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(menuItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MenuItems
        [HttpPost]
        public async Task<IActionResult> PostMenuItem([FromBody] MenuItem menuItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
    
            // Console.WriteLine(menuItem);

            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMenuItem", new { id = menuItem.Id }, menuItem);
        }

        // DELETE: api/MenuItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var menuItem = await _context.MenuItems.SingleOrDefaultAsync(m => m.Id == id);
            if (menuItem == null)
            {
                return NotFound();
            }

            _context.MenuItems.Remove(menuItem);
            await _context.SaveChangesAsync();

            return Ok(menuItem);
        }

        private bool MenuItemExists(int id)
        {
            return _context.MenuItems.Any(e => e.Id == id);
        }
    }
}