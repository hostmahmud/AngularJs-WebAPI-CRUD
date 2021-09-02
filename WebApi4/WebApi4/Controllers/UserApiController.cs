using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi2.Models;

namespace WebApi4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserApiController : ControllerBase
    {
        private readonly ProjectDbContext _context;

        public UserApiController(ProjectDbContext context)
        {
            _context = context;
        }

        // GET: api/UserApi
        [HttpGet]
        public async Task<string[]> GetRegisters([FromQuery] string email, string password)
        {
            if (email == null && password == null)
            {
                var userCount = await _context.Registers.CountAsync();
                var StaffCount = await _context.Registers.Where(m=>m.UserType=="Staff").CountAsync();
                var countTickets = await _context.Tickets.CountAsync();
                var countTicketsResolved = await _context.Tickets.Where(m=>m.Status=="Closed" || m.Status=="Resolved").CountAsync();

                string[] minMax = new string[4];

                minMax[0] = userCount.ToString();
                minMax[1] = countTickets.ToString();
                minMax[2] = countTicketsResolved.ToString();
                minMax[3] = StaffCount.ToString();

                return minMax;
            }
            else
            {
                var register = await _context.Registers
                .FirstOrDefaultAsync(m => m.Email == email && m.Password == password);

                if (register == null)
                {
                    return null;
                }
                else
                {
                    string[] num = new string[1];
                    num[0] = "1";
                    return num;
                }
            }
            
            
        }


        // GET: api/UserApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Register>> GetRegister(int id)
        {
            var register = await _context.Registers.FindAsync(id);

            if (register == null)
            {
                return NotFound();
            }

            return register;
        }

        
        ////do login
        //[HttpGet]
        //public async Task<ActionResult<Register>> GetRegister([FromQuery] string email, string password)
        //{
        //    if (email == null && password == null)
        //    {
        //        return NotFound();
        //    }

        //    var register = await _context.Registers
        //        .FirstOrDefaultAsync(m => m.Email == email);
        //    if (register == null)
        //    {
        //        return NotFound();
        //    }
        //    else if (register.Password == password)
        //    {
        //        return register;
        //    }
        //    else
        //    {
        //        return null;
        //    }

        //}

        // PUT: api/UserApi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegister(int id, Register register)
        {
            if (id != register.Id)
            {
                return BadRequest();
            }

            _context.Entry(register).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisterExists(id))
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

        // POST: api/UserApi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Register>> PostRegister(Register register)
        {
            _context.Registers.Add(register);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegister", new { id = register.Id }, register);
        }

        // DELETE: api/UserApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegister(int id)
        {
            var register = await _context.Registers.FindAsync(id);
            if (register == null)
            {
                return NotFound();
            }

            _context.Registers.Remove(register);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegisterExists(int id)
        {
            return _context.Registers.Any(e => e.Id == id);
        }
    }
}
