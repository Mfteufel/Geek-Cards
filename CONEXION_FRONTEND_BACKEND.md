# 🔗 Guía de Conexión Frontend - Backend

## ✅ Cambios Realizados

### 1. **Servicio de Autenticación (`src/services/api.js`)**
   - ✅ Creado `authService` con métodos `register()` y `login()`
   - ✅ Agregado manejo de JWT tokens
   - ✅ Tokens se envían automáticamente en headers `Authorization: Bearer <token>`
   - ✅ Actualizado `usuarioService` para usar los endpoints correctos

### 2. **Contexto de Autenticación (`src/context/AuthContext.jsx`)**
   - ✅ Nuevo contexto global para manejar autenticación
   - ✅ Hook `useAuth()` para acceder a usuario y funciones de auth en cualquier componente
   - ✅ Persiste el usuario en localStorage/sessionStorage

### 3. **Componente de Login (`src/pages/Auth/Login.jsx`)**
   - ✅ Actualizado para usar `authService.login()`
   - ✅ Simplificado: removido fallback offline
   - ✅ Manejo de errores mejorado

### 4. **Componente de Register (`src/pages/Auth/Register.jsx`)**
   - ✅ Cambio de campo `name` a `fullName` (como espera el backend)
   - ✅ Actualizado para usar `authService.register()`
   - ✅ Guarda token JWT automáticamente

### 5. **App.jsx**
   - ✅ Envuelto con `AuthProvider` para acceso global a autenticación

---

## 📝 Endpoints del Backend

```
POST /api/auth/register
Content-Type: application/json
Body:
{
  "fullName": "Nombre Completo",
  "email": "email@ejemplo.com",
  "password": "password123"  // Mínimo 6 caracteres
}

Response:
{
  "token": "eyJhbGciOiJIUzI1...",
  "expirationMillis": 86400000,
  "id": 1,
  "email": "email@ejemplo.com",
  "fullName": "Nombre Completo"
}
```

```
POST /api/auth/login
Content-Type: application/json
Body:
{
  "email": "email@ejemplo.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1...",
  "expirationMillis": 86400000,
  "id": 1,
  "email": "email@ejemplo.com",
  "fullName": "Nombre Completo"
}
```

---

## 🔐 Cómo Usar la Autenticación en Componentes

### Opción 1: Usar el hook `useAuth()` (Recomendado)

```jsx
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { user, token, login, register, logout, isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated() && <p>Bienvenido, {user.fullName}</p>}
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
```

### Opción 2: Usar `authService` directamente

```jsx
import { authService } from '../services/api';

async function handleLogin(email, password) {
  try {
    const response = await authService.login(email, password);
    console.log('Token:', response.token);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

---

## 🌐 Configuración para Producción

En `src/config/api.js`, cambiar:

```javascript
export const getBackendUrl = () => {
  if (isDevelopment()) {
    return 'http://localhost:8080/api';
  }
  // Cambiar por tu servidor en producción
  return 'https://tu-servidor-produccion.com/api';
};
```

---

## ✅ Checklist de Verificación

- [ ] El backend está corriendo en `http://localhost:8080`
- [ ] El frontend está corriendo en `http://localhost:5173` (Vite)
- [ ] Al registrarse se guarda el token JWT
- [ ] Al hacer login se recibe el token JWT
- [ ] Las peticiones autenticadas incluyen el header `Authorization: Bearer <token>`
- [ ] El usuario se mantiene logueado después de recargar la página

---

## 🔧 Troubleshooting

### "password required"
- ✅ SOLUCIONADO: Cambiar de `passwordHash` a `password`
- ✅ SOLUCIONADO: Cambiar de `name` a `fullName`

### CORS errors
Si ves errores de CORS en la consola, el backend necesita configurar CORS:

```java
// En application.properties
server.servlet.context-path=/
cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

### Token no se envía
- Verificar que el token esté guardado en localStorage: `localStorage.getItem('geekCardsCurrentUser')`
- Verificar en DevTools Network que el header `Authorization` esté presente

---

## 📚 Próximos Pasos

1. Implementar token refresh
2. Proteger rutas que requieren autenticación
3. Validar sesión expirada
4. Implementar recuperación de contraseña
5. Conectar endpoints de cartas con el backend
