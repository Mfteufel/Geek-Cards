# 🔍 DEBUGGING - Guía para encontrar el problema

## ¿Qué necesitamos verificar?

### 1. Ver errores en consola (F12)

Abre DevTools en el navegador (F12):
- Ve a la pestaña **Console**
- Intenta registrarte
- **Copia TODO lo que salga en rojo** y pégalo aquí

Busca especialmente:
- `[REGISTER SUCCESS]` - Si ves esto, el backend respondió bien
- `[REGISTER ERROR]` - Si ves esto, hay un error
- Errores de red (CORS, 404, 500, etc.)

### 2. Verificar localStorage

En la consola ejecuta:
```javascript
console.log('LocalStorage:', localStorage.getItem('geekCardsCurrentUser'))
```

Deberías ver algo como:
```json
{
  "token": "eyJhbGci...",
  "id": 1,
  "email": "test@example.com",
  "fullName": "Test"
}
```

Si sale `null` o `undefined` → el token NO se está guardando

### 3. Ver la respuesta del backend

En la consola (pestaña Network):
```
1. F12 → Network
2. Intenta registrarte
3. Busca la petición "register"
4. Click en ella
5. Ve a "Response"
6. Copia la respuesta completa
```

---

## 📋 Checklist de Problemas Comunes

- [ ] **¿El backend está corriendo?**
  ```bash
  # En terminal del backend debería ver:
  # "Tomcat started on port(s): 8080"
  ```

- [ ] **¿El mensaje de error muestra cuál es?**
  ```javascript
  // En consola debería decir algo como:
  [REGISTER ERROR] Error: ...mensaje del error...
  ```

- [ ] **¿El token se guarda?**
  ```javascript
  localStorage.getItem('geekCardsCurrentUser')
  // Si es null → no se guardó
  ```

- [ ] **¿Se llama al setTimeout?**
  ```javascript
  // Mira si después de 1 segundo redirige
  // Si NO redirige → setTimeout no se ejecutó
  // Si redirige pero deslogueado → AuthContext no cargó el usuario
  ```

---

## 🛠️ Soluciones Rápidas

### Problema: "Error: undefined"
**Causa:** La respuesta del backend no tiene estructura esperada
**Solución:** Ve a la pestaña Network y mira qué retorna el backend

### Problema: "CORS error"
**Causa:** El backend no permite peticiones desde el frontend
**Solución:** Verifica CORS en `application.properties` del backend

### Problema: "404 Not Found"
**Causa:** El endpoint no existe o está mal escrito
**Solución:** Verifica en `Back/test-api.http` cuál es el endpoint correcto

### Problema: "Se registra pero no redirige"
**Causa:** El setTimeout no se ejecuta o hay error antes
**Solución:** Verifica si hay error en consola

### Problema: "Se registra y redirige pero sin login"
**Causa:** AuthContext no está cargando el usuario de localStorage
**Solución:** Verifica que localStorage tenga el token

---

## 📝 Información que Necesito

Por favor, ejecuta esto en consola y cópiame la salida:

```javascript
// 1. Ver si backend responde
fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test' })
})
.then(r => r.json())
.then(d => console.log('Backend respuesta:', d))
.catch(e => console.log('Backend error:', e.message))

// 2. Ver localStorage
console.log('LocalStorage:', JSON.parse(localStorage.getItem('geekCardsCurrentUser') || 'null'))

// 3. Ver AuthContext
// (esto depende de tu implementación, pero ejecuta esto en el componente)
```

---

## 🎬 Próximos Pasos

1. Abre la consola (F12)
2. Intenta registrarte
3. Copia TODO lo que veas en rojo/amarillo
4. Copia la respuesta del Network
5. Dime exactamente:
   - ¿Qué error ves?
   - ¿Qué retorna el backend?
   - ¿Se guarda en localStorage?
   - ¿Se redirige?
   - ¿Si se redirige, ¿estás logueado?
