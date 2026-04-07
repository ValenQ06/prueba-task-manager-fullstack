--CONSULTA CON JSON
USE TaskManagerDB;
GO

DECLARE @UserId INT = 1;
DECLARE @Status NVARCHAR(50) = 'Done';

SELECT 
    t.Id,
    t.Title,
    t.Status,
    u.Name AS UserName,
    t.CreatedAt,
    JSON_VALUE(t.ExtraData, '$.priority') AS Priority
FROM Tasks t
INNER JOIN Users u ON t.UserId = u.Id
WHERE 
    (@UserId IS NULL OR t.UserId = @UserId)
    AND (@Status IS NULL OR t.Status = @Status)
    AND (
        JSON_VALUE(t.ExtraData, '$.priority') = 'High'
        OR t.ExtraData IS NULL
    )
ORDER BY t.CreatedAt DESC;