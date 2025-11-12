# Geek Cards API - Backend Spring Boot

## Descripción
API REST para el sistema de autenticación de usuarios de Geek Cards, desarrollada con Spring Boot.

## Características
- ✅ Registro de usuarios con validación
- ✅ Login con autenticación segura
- ✅ Hash de contraseñas con BCrypt
- ✅ Almacenamiento en archivo JSON
- ✅ CORS configurado para frontend React
- ✅ Validación de datos de entrada
- ✅ Respuestas JSON estructuradas

## Endpoints Disponibles

### Usuarios
- `POST /api/usuarios/register` - Registrar nuevo usuario
- `POST /api/usuarios/login` - Iniciar sesión
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/{id}` - Obtener usuario por ID
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario
- `GET /api/usuarios/check-email?email={email}` - Verificar si email existe

## Configuración

### Puerto
- **Backend**: 8080
- **Frontend**: 3000

### CORS
Configurado para permitir conexiones desde:
- http://localhost:3000
- http://localhost:5173
- http://127.0.0.1:3000
- http://127.0.0.1:5173

## Ejecución

### Requisitos
- Java 17+
- Maven 3.6+

### Comandos
```bash
# Compilar y ejecutar
mvn spring-boot:run

# O compilar primero y luego ejecutar
mvn clean compile
mvn spring-boot:run
```

### Verificación
- La API estará disponible en: http://localhost:8080
- Documentación de endpoints: http://localhost:8080/api/usuarios

## Estructura de Datos

### Usuario
```json
{
  "id": 1,
  "name": "Usuario Demo",
  "email": "demo@geekcards.com",
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

### Respuesta API
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... },
  "error": null
}
```

## Almacenamiento
- Los datos se guardan en: `data/users.json`
- Se crea automáticamente si no existe
- Incluye usuario demo por defecto

## Seguridad
- Contraseñas hasheadas con BCrypt
- Validación de entrada con Bean Validation
- Headers CORS configurados
- No exposición de contraseñas en respuestas JSON
