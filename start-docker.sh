#!/bin/bash

echo "========================================"
echo "Geek Cards API - Docker Setup"
echo "========================================"
echo ""

# Check if .env file exists in Back folder
if [ ! -f "Back/.env" ]; then
    echo "Creating Back/.env file with default values..."
    cat > Back/.env << EOF
DB_USER=geek
DB_PASSWORD=geekpass
DB_ROOT_PASSWORD=rootpass
JWT_SECRET=Z2Vla2NhcmRzLXN1cGVyLXNlY3JldC1rZXktcGxlYXNlLWNoYW5nZQ==
LOGGING_LEVEL_ROOT=INFO
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:4173
CARDS_IMPORT_ON_START=true
VITE_API_BASE_URL=/api
EOF
    echo "Back/.env file created!"
    echo ""
else
    echo "Back/.env file already exists, skipping creation."
    echo ""
fi

echo "Building and starting Docker containers..."
echo ""
docker-compose up -d --build

echo ""
echo "========================================"
echo "Services are starting up!"
echo "========================================"
echo ""
echo "Frontend: http://localhost:4173"
echo "Backend API: http://localhost:9090/api"
echo "phpMyAdmin: http://localhost:9081"
echo "Database: localhost:3307"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
echo ""

