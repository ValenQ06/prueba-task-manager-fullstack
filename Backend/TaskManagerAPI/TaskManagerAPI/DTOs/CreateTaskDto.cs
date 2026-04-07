namespace TaskManagerAPI.DTOs
{
    public class CreateTaskDto
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public int UserId { get; set; }
        public string? ExtraData { get; set; }
    }
}
