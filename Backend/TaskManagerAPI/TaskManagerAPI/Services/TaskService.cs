using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs;
using TaskManagerAPI.Entities;
using TaskManagerAPI.Exceptions;

namespace TaskManagerAPI.Services
{
    public class TaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateTask(CreateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                throw new ApiException("Title is required");

            var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);
            if (!userExists)
                throw new ApiException("User does not exist");

            // Normalizar valor vacío
            if (string.IsNullOrWhiteSpace(dto.ExtraData))
            {
                dto.ExtraData = null;
            }

            // Validar JSON
            try
            {
                if (dto.ExtraData != null)
                {
                    JsonDocument.Parse(dto.ExtraData);
                }
            }
            catch (JsonException)
            {
                throw new ApiException("Invalid JSON format");
            }

            // Crear entidad DESPUÉS de validar
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                UserId = dto.UserId,
                Status = "Pending",
                ExtraData = dto.ExtraData
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
        }

        public async Task ChangeStatus(int id, string newStatus)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                throw new Exception("Task not found");

            if (task.Status == "Pending" && newStatus == "Done")
                throw new Exception("Invalid transition");

            task.Status = newStatus;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                throw new ApiException("Task not found", 404);

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}
