# Geek Cards API - Docker Setup

Este proyecto está configurado para ejecutarse completamente en Docker.

## Requisitos Previos

- Docker Desktop instalado y ejecutándose
- Docker Compose (incluido en Docker Desktop)

## Estructura del Proyecto

- **Back/**: Aplicación Spring Boot (Backend API)
- **Geek-CardsAPI-Marco/**: Aplicación React (Frontend)
- **docker-compose.yml**: Configuración de todos los servicios

## Servicios Docker

1. **db**: Base de datos MySQL 8.0 (puerto 3307)
2. **backend**: API Spring Boot (puerto 9090)
3. **frontend**: Aplicación React con Nginx (puerto 4173)
4. **phpmyadmin**: Interfaz web para MySQL (puerto 9081)

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la carpeta `Back/` con las siguientes variables (o usa los valores por defecto):

```env
DB_USER=geek
DB_PASSWORD=geekpass
DB_ROOT_PASSWORD=rootpass
JWT_SECRET=Z2Vla2NhcmRzLXN1cGVyLXNlY3JldC1rZXktcGxlYXNlLWNoYW5nZQ==
LOGGING_LEVEL_ROOT=INFO
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:4173
CARDS_IMPORT_ON_START=true
VITE_API_BASE_URL=/api
```

## Inicio Rápido

1. **Construir y levantar todos los servicios:**
   ```bash
   docker-compose up -d --build
   ```

2. **Ver los logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Ver logs de un servicio específico:**
   ```bash
   docker-compose logs -f backend
   docker-compose logs -f frontend
   docker-compose logs -f db
   ```

4. **Detener todos los servicios:**
   ```bash
   docker-compose down
   ```

5. **Detener y eliminar volúmenes (incluyendo datos de BD):**
   ```bash
   docker-compose down -v
   ```

## Acceso a los Servicios

- **Frontend**: http://localhost:4173
- **Backend API**: http://localhost:9090/api
- **phpMyAdmin**: http://localhost:9081
- **Base de datos MySQL**: localhost:3307

## Comandos Útiles

### Reconstruir un servicio específico
```bash
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

### Ejecutar comandos dentro de un contenedor
```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh

# Base de datos
docker-compose exec db mysql -u geek -p geekcards
```

### Ver estado de los servicios
```bash
docker-compose ps
```

### Reiniciar un servicio
```bash
docker-compose restart backend
docker-compose restart frontend
```

## Arquitectura

El frontend usa Nginx como servidor web y proxy inverso. Las peticiones a `/api/*` son redirigidas automáticamente al backend a través de la red interna de Docker.

- Frontend (Nginx) → Proxy `/api/*` → Backend (Spring Boot) → Base de datos (MySQL)

## Troubleshooting

### El backend no se conecta a la base de datos
- Verifica que el servicio `db` esté saludable: `docker-compose ps`
- Revisa los logs: `docker-compose logs db backend`

### El frontend no puede conectarse al backend
- Verifica que ambos servicios estén en la misma red Docker
- Revisa la configuración de nginx: `Geek-CardsAPI-Marco/docker/nginx.conf`

### Limpiar todo y empezar de nuevo
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## Notas

- La base de datos se inicializa automáticamente con las tablas necesarias
- Las cartas se importan automáticamente al iniciar el backend (si `CARDS_IMPORT_ON_START=true`)
- Los datos de la base de datos persisten en el volumen `db_data`

