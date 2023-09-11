using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Docker.NetCore.MySql.Data;
using Docker.NetCore.MySql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace Docker.NetCore.MySql.Controllers
{
    [Produces("application/json")]
    [Route("api/Bookmakers")]
    public class BookmakersController : Controller
    {
        private readonly Data.MySqlDbContext _context;

        public BookmakersController(Data.MySqlDbContext context)
        {
            _context = context;
        }

        // GET: api/Bookmakers
        [HttpGet]
        public IEnumerable<Bookmaker> GetBookmaker()
        {
            return _context.Bookmakers.OrderByDescending(b => b.Primary);
        }

        // GET: api/Bookmakers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookmaker([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bookmaker = await _context.Bookmakers.SingleOrDefaultAsync(b => b.Id == id);

            if (bookmaker == null)
            {
                return NotFound();
            }

            return Ok(bookmaker);
        }

        // PUT: api/Bookmakers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookmaker([FromRoute] int id, [FromBody] Bookmaker bookmaker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Console.WriteLine(id);
            Console.WriteLine(bookmaker.Id);


            if (id != bookmaker.Id)
            {
                return BadRequest();
            }

            // we should have only ony primary bookmaker
            if (bookmaker.Primary == true) 
            {
                var bookmakerRecords = _context.Bookmakers.Where(b => b.Primary == true && b.Id != bookmaker.Id).ToList();

                foreach (var bookmakerRecord in bookmakerRecords)
                {
                    bookmakerRecord.Primary = false;
                    _context.Update(bookmakerRecord);
                    await _context.SaveChangesAsync();
                }
            }


            if (bookmaker.Logo != null && bookmaker.Logo.Length > 0)
            {
                var trustedFileName = Path.GetRandomFileName();
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                // var filePath = Path.Combine("backend/wwwroot/images", trustedFileName);

                // if (System.IO.File.Exists(filePath))
                // {
                //     return;
                // }

                System.IO.File.WriteAllBytes(filePath, bookmaker.Logo);
            }

            // if (bookmaker.Logo != null && bookmaker.Logo.Length > 0)
            // {
            //     // var filePath = Path.Combine(_env.WebRootPath, "images", bookmaker.Logo.FileName);
            //     var filePath = Path.Combine("wwwroot/", "images", bookmaker.Logo.FileName);
            //     using (var stream = new FileStream(filePath, FileMode.Create))
            //     {
            //         await bookmaker.Logo.CopyToAsync(stream);
            //     }
            //     bookmaker.Logo = "images/" + bookmaker.Logo.FileName;
            // }

            // save bookmaker
            _context.Entry(bookmaker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookmakerExists(id))
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

        // POST: api/Bookmakers
        [HttpPost]
        public async Task<IActionResult> PostBookmaker([FromBody] Bookmaker bookmaker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (bookmaker.Primary == true) 
            {
                var bookmakerRecords = _context.Bookmakers.Where(b => b.Primary == true).ToList();

                foreach (var bookmakerRecord in bookmakerRecords)
                {
                    bookmakerRecord.Primary = false;
                    _context.Update(bookmakerRecord);
                    await _context.SaveChangesAsync();
                }
            }
    
            _context.Bookmakers.Add(bookmaker);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookmaker", new { id = bookmaker.Id }, bookmaker);
        }

        // DELETE: api/Bookmakers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookmaker([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bookmaker = await _context.Bookmakers.SingleOrDefaultAsync(m => m.Id == id);
            if (bookmaker == null)
            {
                return NotFound();
            }

            // set a bookmaker as primary
            if (bookmaker.Primary == true) 
            {
                var bookmakerToMakePrimary = _context.Bookmakers.Where(b => b.Id != bookmaker.Id).FirstOrDefault();

                if (bookmakerToMakePrimary != null)
                {
                    bookmakerToMakePrimary.Primary = true;
                    _context.SaveChanges();
                }
            }

            _context.Bookmakers.Remove(bookmaker);
            await _context.SaveChangesAsync();

            return Ok(bookmaker);
        }

        private bool BookmakerExists(int id)
        {
            return _context.Bookmakers.Any(e => e.Id == id);
        }
    }
}