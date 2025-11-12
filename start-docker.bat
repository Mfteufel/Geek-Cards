@echo off
echo ========================================
echo Geek Cards API - Docker Setup
echo ========================================
echo.

REM Check if .env file exists in Back folder
if not exist "Back\.env" (
    echo Creating Back\.env file with default values...
    (
        echo DB_USER=geek
        echo DB_PASSWORD=geekpass
        echo DB_ROOT_PASSWORD=rootpass
        echo JWT_SECRET=Z2Vla2NhcmRzLXN1cGVyLXNlY3JldC1rZXktcGxlYXNlLWNoYW5nZQ==
        echo LOGGING_LEVEL_ROOT=INFO
        echo CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:4173
        echo CARDS_IMPORT_ON_START=true
        echo VITE_API_BASE_URL=/api
    ) > Back\.env
    echo Back\.env file created!
    echo.
) else (
    echo Back\.env file already exists, skipping creation.
    echo.
)

echo Building and starting Docker containers...
echo.
docker-compose up -d --build

echo.
echo ========================================
echo Services are starting up!
echo ========================================
echo.
echo Frontend: http://localhost:4173
echo Backend API: http://localhost:9090/api
echo phpMyAdmin: http://localhost:9081
echo Database: localhost:3307
echo.
echo To view logs: docker-compose logs -f
echo To stop: docker-compose down
echo.

