using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi2.Models;
using WebApi4.Models;

namespace WebApi4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketRepliesController : ControllerBase
    {
        private readonly ProjectDbContext _context;

        public TicketRepliesController(ProjectDbContext context)
        {
            _context = context;
        }

        // GET: api/TicketReplies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketReplies>>> GetTicketReplies()
        {
            return await _context.TicketReplies.ToListAsync();
        }

        // GET: api/TicketReplies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketReplies>> GetTicketReplies(int id)
        {
            var ticketReplies = await _context.TicketReplies.FindAsync(id);

            if (ticketReplies == null)
            {
                return NotFound();
            }

            return ticketReplies;
        }

        // PUT: api/TicketReplies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicketReplies(int id, TicketReplies ticketReplies)
        {
            if (id != ticketReplies.TicketRepliesId)
            {
                return BadRequest();
            }

            _context.Entry(ticketReplies).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketRepliesExists(id))
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

        // POST: api/TicketReplies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TicketReplies>> PostTicketReplies(TicketReplies ticketReplies)
        {
            _context.TicketReplies.Add(ticketReplies);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicketReplies", new { id = ticketReplies.TicketRepliesId }, ticketReplies);
        }

        // DELETE: api/TicketReplies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicketReplies(int id)
        {
            var ticketReplies = await _context.TicketReplies.FindAsync(id);
            if (ticketReplies == null)
            {
                return NotFound();
            }

            _context.TicketReplies.Remove(ticketReplies);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketRepliesExists(int id)
        {
            return _context.TicketReplies.Any(e => e.TicketRepliesId == id);
        }
    }
}
