#!/bin/sh
set -e

# Default to localhost if API_HOST is not set
API_HOST=${API_HOST:-localhost:8080}

# If host contains 'localhost', use http, else https
if [[ "$API_HOST" == *"localhost"* ]]; then
    API_URL="http://$API_HOST"
else
    API_URL="https://$API_HOST"
fi

# Replace placeholders in nginx config
sed -i "s|__API_URL__|$API_URL|g" /etc/nginx/conf.d/default.conf
sed -i "s|__API_HOST__|$API_HOST|g" /etc/nginx/conf.d/default.conf

echo "Starting Nginx with API_URL=$API_URL..."
nginx -g "daemon off;"
