using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TaskManagement.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
        {
            var tasks = await _context.Tasks
                .OrderByDescending(task => task.UpdatedAt)
                .ToListAsync();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<ActionResult<Task>> AddTask(Task task)
        {
            task.CreatedAt = DateTime.Now;
            task.UpdatedAt = DateTime.Now;

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, Task updatedTask)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.UpdatedAt = DateTime.Now;

            try
            {
                _context.Tasks.Update(task);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Failed to update the task.");
            }

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string searchTerm)
        {
            var tasks = await _context.Tasks
                .Where(
                    t =>
                        t.Description != null
                        && EF.Functions
                            .Collate(t.Description, "SQL_Latin1_General_CP1_CS_AS")
                            .StartsWith(searchTerm)
                )
                .ToListAsync();

            return Ok(tasks);
        }

        [HttpPost("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] bool status)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            task.Status = status;
            await _context.SaveChangesAsync();

            return Ok(task);
        }
    }
}
