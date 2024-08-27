using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apiTask.Data;
using apiTask.Dto;

namespace apiTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskEntity>>> GetTasks()
        {
            return await _context.Tasks.OrderBy(u => u.Estado).ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskEntity>> GetTaskEntity(int id)
        {
            var taskEntity = await _context.Tasks.FindAsync(id);

            if (taskEntity == null)
            {
                return NotFound();
            }

            return taskEntity;
        }

        // PUT: api/Task/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskEntity(int id, TaskEditDto taskEntity)
        {
            var taskEntityOrigin = await _context.Tasks.FindAsync(id);
            taskEntityOrigin.Descripcion = taskEntity.Descripcion;
            taskEntityOrigin.Titulo = taskEntity.Titulo;

            _context.Entry(taskEntityOrigin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskEntityExists(id))
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


        [HttpPut("changeState/{id}")]
        public async Task<IActionResult> PutTaskStateEntity(int id, TaskEditStateDto taskEntity)
        {
            var taskEntityOrigin = await _context.Tasks.FindAsync(id);
            taskEntityOrigin.Estado = taskEntity.Estado;

            _context.Entry(taskEntityOrigin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskEntityExists(id))
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

        // POST: api/Task
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaskEntity>> PostTaskEntity(TaskCreateDto task)
        {
            TaskEntity taskEntityOrigin = new TaskEntity();

            taskEntityOrigin.Estado = task.Estado;
            taskEntityOrigin.Descripcion = task.Descripcion;
            taskEntityOrigin.Titulo = task.Titulo;

            _context.Tasks.Add(taskEntityOrigin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskEntity", new { id = taskEntityOrigin.Id }, taskEntityOrigin);
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskEntity(int id)
        {
            var taskEntity = await _context.Tasks.FindAsync(id);
            if (taskEntity == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(taskEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskEntityExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
