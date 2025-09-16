# 🎮 Demo del Sistema de Autenticación

## Usuarios de Prueba

El sistema incluye un usuario demo preconfigurado:

**Usuario Demo:**
- Email: `demo@geekcards.com`
- Contraseña: `12345678`

## 🚀 Cómo Probar el Sistema

### 1. Registro de Nuevo Usuario
1. Ve a `/auth/register`
2. Completa el formulario con:
   - Nombre (mínimo 2 caracteres)
   - Email válido
   - Contraseña (mínimo 8 caracteres)
   - Confirmar contraseña
3. El sistema validará:
   - ✅ Campos obligatorios
   - ✅ Formato de email válido
   - ✅ Longitud de contraseña
   - ✅ Coincidencia de contraseñas
   - ✅ Email único (no duplicado)

### 2. Inicio de Sesión
1. Ve a `/auth/login`
2. Usa el usuario demo o uno que hayas registrado
3. Opcionalmente marca "Recordarme" para persistir la sesión
4. El sistema validará:
   - ✅ Credenciales correctas
   - ✅ Usuario existente

### 3. Funcionalidades del Header
- **Sin autenticar**: Muestra botones "Registrarse" e "Iniciar Sesión"
- **Autenticado**: Muestra saludo personalizado y botón "Cerrar Sesión"

## 💾 Almacenamiento de Datos

### LocalStorage
- `geekCardsUsers`: Base de datos simulada de usuarios
- `geekCardsCurrentUser`: Usuario actual (si marcó "Recordarme")

### SessionStorage
- `geekCardsCurrentUser`: Usuario actual (sesión temporal)

## 🔧 Características Técnicas

### Validaciones Implementadas
- ✅ Validación de email con regex
- ✅ Longitud mínima de contraseña
- ✅ Confirmación de contraseña
- ✅ Campos obligatorios
- ✅ Email único en el sistema
- ✅ Estados de carga (loading)
- ✅ Mensajes de error descriptivos

### Navegación
- ✅ Redirección automática después del registro
- ✅ Redirección automática después del login
- ✅ Navegación entre formularios
- ✅ Persistencia de sesión

### UX/UI
- ✅ Estados de carga en botones
- ✅ Botones deshabilitados durante procesamiento
- ✅ Limpieza automática de alertas
- ✅ Feedback visual inmediato
- ✅ Diseño responsive

## 🎯 Flujo Completo de Usuario

1. **Usuario nuevo**:
   - Registro → Validación → Redirección a Login → Login → Dashboard

2. **Usuario existente**:
   - Login → Validación → Dashboard

3. **Sesión persistente**:
   - Recarga de página → Verificación automática → Estado mantenido

## 🐛 Debugging

### Console Logs
El sistema registra en consola:
- `[REGISTER SUCCESS]`: Usuario registrado exitosamente
- `[LOGIN SUCCESS]`: Usuario logueado exitosamente
- `[REGISTER ERROR]` / `[LOGIN ERROR]`: Errores del sistema

### LocalStorage
Puedes inspeccionar el localStorage del navegador para ver:
- Lista de usuarios registrados
- Usuario actual logueado

---

**¡El sistema está listo para usar! 🚀**
