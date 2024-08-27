using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dto;

namespace WebApi.Controllers
{
    [Route("employees")]
    [ApiController]
    public class EmployeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Employe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeEntity>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }


        [HttpPost("empleadosPorFecha")]
        public async Task<ActionResult<IEnumerable<EmployeEntity>>> GetEmployeesByDate(DateTime fechaContrato)
        {
            return await GetEmployeesByDateAsync(fechaContrato);
        }

        // GET: api/Employe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeEntity>> GetEmployeEntity(int id)
        {
            var employeEntity = await _context.Employees.FindAsync(id);

            if (employeEntity == null)
            {
                return NotFound();
            }

            return employeEntity;
        }

        // PUT: api/Employe/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeEntity(int id, EmployeDto employe)
        {
            EmployeEntity? employeEntity = await _context.Employees.FindAsync(id);
            if (employeEntity == null)
            {
                return NotFound();
            }
            employeEntity.FirstName = employe.FirstName;
            employeEntity.LastName = employe.LastName;
            employeEntity.Email = employe.Email;
            employeEntity.PhoneNumber = employe.PhoneNumber;
            employeEntity.HireDate = employe.HireDate;

            _context.Entry(employeEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeEntityExists(id))
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

        // POST: api/Employe
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmployeEntity>> PostEmployeEntity(EmployeDto employe)
        {
            EmployeEntity employeEntity = new EmployeEntity();

            employeEntity.FirstName = employe.FirstName;
            employeEntity.LastName = employe.LastName;
            employeEntity.Email = employe.Email;
            employeEntity.PhoneNumber = employe.PhoneNumber;
            employeEntity.HireDate = employe.HireDate;

            _context.Employees.Add(employeEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeEntity", new { id = employeEntity.EmployeeId }, employeEntity);
        }

        // DELETE: api/Employe/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeEntity(int id)
        {
            var employeEntity = await _context.Employees.FindAsync(id);
            if (employeEntity == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employeEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeEntityExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }

        private async Task<List<EmployeEntity>> GetEmployeesByDateAsync(DateTime fechaContrato)
        {
            using (var context = _context)
            {
                var products = await context.Employees
                    .FromSqlRaw("EXEC sp_obtenerEmpleadoPorFecha @fechaContrato",
                        new SqlParameter("@fechaContrato", fechaContrato))
                    .ToListAsync();
                return products;
            }
        }
    }
}
