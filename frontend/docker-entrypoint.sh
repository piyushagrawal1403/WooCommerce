#!/bin/sh
set -e

# Replace ${API_URL} in nginx.conf.template with env var value, output to nginx.conf
envsubst '${API_URL}' < /etc/nginx/nginx.conf > /etc/nginx/conf.d/default.conf

# Start nginx
exec nginx -g 'daemon off;'
