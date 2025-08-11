#!/bin/sh
set -e

# Default to a placeholder if API_URL is not set
API_URL=${API_URL:-http://localhost:8080}

# Replace placeholder in the Nginx config
sed -i "s|__API_URL__|$API_URL|g" /etc/nginx/conf.d/default.conf

echo "Starting Nginx with API_URL=$API_URL..."
nginx -g "daemon off;"
