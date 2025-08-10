# Stage 1 — Build the React app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the app
RUN npm run build

# Stage 2 — Serve with Nginx
FROM nginx:1.27-alpine

# Copy the built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Remove default nginx config and replace with our own (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["/bin/sh", "-c", "echo \"window.RUNTIME_CONFIG = { API_BASE: '${VITE_API_BASE}' }\" > /usr/share/nginx/html/config.js && nginx -g 'daemon off;'"]
