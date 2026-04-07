namespace TaskManagerAPI.DTOs
{
    public class ResponseTaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string? Description { get; set; }
    }
}
