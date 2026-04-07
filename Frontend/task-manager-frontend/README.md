# 🧩 Task Manager - Prueba Técnica Fullstack Semisenior

## 📌 Descripción

Aplicación web fullstack para la gestión de tareas y usuarios, desarrollada con:

- Backend: .NET Web API
- Frontend: Angular
- Base de datos: SQL Server

Permite crear, asignar, eliminar y hacer seguimiento a tareas, así como gestionar usuarios.

---

## 🚀 Pasos para ejecutar el proyecto

🔹 Backend (.NET)

1. Abrir el proyecto en Visual Studio o VS Code
2. Configurar la cadena de conexión en `appsettings.json`
3. Ejecutar migraciones:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update

4. Ejecutar la API:
dotnet run o ejecutar desde visual studio con el boton ▶️

🔹 Frontend (Angular)

1. Ir a la carpeta del frontend:
cd task-manager-frontend

2. Instalar dependencias:
npm install

3. Validar que en environments.ts esté configurada correctamente la URL del backend.

4. Ejecutar el proyecto:
ng serve

5. Abrir en navegador:
http://localhost:4200 (Si Angular usa otro puerto, abrir con ese)

Nota: Los botones de Creación de tarea y de usuario se encuentran deshabilitados, se habilitan hasta que los campos requeridos estén llenos y sean validos.

🔹 Querys SQL Server

En la carpeta SQL se encuentran dos Querys requeridos por la prueba el primero es la creacion del modelo de datos en SQL Server y el otro es la consulta que demuestra el correcto uso de los datos en formato json en SQL.

---

🧠 Decisiones técnicas:
- Se utilizó arquitectura por capas (Controller, Service, Repository implícito con EF).
- Uso de DTOs para separar entidades de la API.
- Entity Framework Core con enfoque Code First.
- Validaciones tanto en frontend como en backend.
- Manejo global de errores mediante middleware.
- Uso de SQL Server con restricciones e índices.
- Implementación de campo JSON (ExtraData) con validación usando ISJSON.

🔹 Manejo de JSON en SQL Server:

- Se implementó un campo ExtraData de tipo NVARCHAR(MAX) para almacenar información adicional.

Ejemplo de validación:

CHECK (ExtraData IS NULL OR ISJSON(ExtraData) = 1)

Ejemplo de consulta:

SELECT
    Title,
    JSON_VALUE(ExtraData, '$.priority') AS Priority
FROM Tasks
WHERE JSON_VALUE(ExtraData, '$.priority') = 'High';

---

🧠 Funcionalidades implementadas:
- Requeridas
- Crear usuarios
- Listar usuarios
- Crear tareas
- Asignar tareas a usuarios
- Listar tareas
- Cambiar estado de tareas
- Validaciones de negocio
- Filtro por estado
- Uso de JSON en SQL Server

🚀 Funcionalidades adicionales (no requeridas):
- Eliminación de tareas
- Eliminación de usuarios (con validación de integridad)
- Modal personalizado para confirmación (sin usar alert nativo)
- Visualización detallada de tareas (modal con descripción)
- Mejoras de UI/UX con Bootstrap y estilos personalizados
- Validaciones visuales en formularios
- Manejo de errores amigable en frontend
- Diseño responsivo y moderno

🔹 Funcionalidades pendientes:
- Edición de tareas
- Edición de usuarios
- Autenticación (login)
- Paginación en listas
- Mejoras en manejo de estados globales

📌 Conclusión:

El proyecto cumple con todos los requerimientos solicitados, incluyendo el manejo de JSON en SQL Server, y se implementaron funcionalidades adicionales para mejorar la experiencia de usuario y demostrar buenas prácticas en el desarrollo de aplicaciones fullstack.


```markdown
📷 Vista de la aplicación

![Home](./Screenshots/home.png)
![Usuarios](./Screenshots/users.png)
![Vista](./Screenshots/view.png)
