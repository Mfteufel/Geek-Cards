# Geek Cards - Ecommerce Unificado

Este proyecto unifica todas las piezas del ecommerce desarrolladas por el equipo, creando una aplicación completa de venta de cartas coleccionables.

## 🚀 Características

### Componentes Integrados

- **Header y Navegación** (Luciano): Sistema de navegación completo con logo y menú
- **Sistema de Autenticación** (WB): Login y registro de usuarios con validación
- **Página de Exploración** (Juan): Búsqueda y filtrado avanzado de cartas
- **Componente ProductCard** (Joaquina): Tarjetas de productos con diseño atractivo
- **Página de Inicio**: Landing page con cartas destacadas y categorías

### Funcionalidades

- ✅ Navegación entre páginas con React Router
- ✅ Sistema de autenticación completo (login/registro)
- ✅ Búsqueda y filtrado de cartas por tipo y rareza
- ✅ Paginación de resultados
- ✅ Diseño responsive y moderno
- ✅ Integración de todos los componentes del equipo

## 🛠️ Tecnologías Utilizadas

- **React 18** con Vite
- **React Router DOM** para navegación
- **CSS3** con gradientes y efectos modernos
- **JavaScript ES6+**

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   └── NavBar.jsx
│   └── ProductCard/
│       ├── ProductCard.jsx
│       └── ProductCard.css
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── Explore/
│   │   ├── Explore.jsx
│   │   ├── Explore.css
│   │   ├── CardGrid.jsx
│   │   └── CardGrid.css
│   └── Auth/
│       ├── Login.jsx
│       ├── Register.jsx
│       └── Auth.css
├── App.jsx
├── App.css
└── main.jsx
```

## 🚀 Instalación y Uso

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

## 🎨 Páginas Disponibles

- **/** - Página de inicio con cartas destacadas
- **/explore** - Explorar y buscar cartas con filtros
- **/auth/login** - Iniciar sesión
- **/auth/register** - Registrarse
- **/ofertas** - Página de ofertas (en construcción)
- **/novedades** - Página de novedades (en construcción)
- **/carrito** - Carrito de compras (en construcción)

## 🔧 Funcionalidades por Desarrollar

- [ ] Integración con API backend real
- [ ] Sistema de carrito de compras
- [ ] Páginas de ofertas y novedades
- [ ] Panel de usuario
- [ ] Sistema de pagos
- [ ] Gestión de inventario

## 👥 Contribuidores

- **Luciano**: Header y navegación
- **Joaquina**: Componente ProductCard
- **Juan**: Sistema de búsqueda y exploración
- **WB**: Sistema de autenticación

## 📝 Notas

- El proyecto está configurado para desarrollo local
- Las imágenes se encuentran en `public/images/`
- Los estilos están optimizados para dispositivos móviles y desktop
- El sistema de autenticación está preparado para conectar con una API real

---

**Desarrollado con ❤️ por el equipo de Geek Cards**