using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskManagerAPI.Entities;

namespace TaskManagerAPI.Data.Configurations
{
    public class TaskConfiguration : IEntityTypeConfiguration<TaskItem>
    {
        public void Configure(EntityTypeBuilder<TaskItem> builder)
        {
            builder.ToTable("Tasks");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(t => t.Status)
                .IsRequired()
                .HasMaxLength(50)
                .HasDefaultValue("Pending");

            builder.Property(t => t.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            builder.Property(t => t.ExtraData)
                .HasColumnType("NVARCHAR(MAX)");

            // RELACIÓN
            builder.HasOne(t => t.User)
                .WithMany(u => u.Tasks)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // ÍNDICE
            builder.HasIndex(t => t.UserId);

            // CHECK JSON
            builder.ToTable(t =>
            {
                t.HasCheckConstraint(
                    "CK_Tasks_ExtraData_JSON",
                    "ExtraData IS NULL OR ISJSON(ExtraData) = 1"
                );
            });
        }
    }
}
