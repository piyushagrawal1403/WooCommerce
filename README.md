# Product Service

This service combines the functionality of the **Product** and **Segment** services into a single microservice for product management and segmentation evaluation.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)  
- [Environment Variables](#environment-variables)  
- [Ingestion Logic](#ingestion-logic)  
- [Sample Input for Segmentation](#sample-input-for-segmentation)  
- [Live Demo Links](#live-demo-links)

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-org/product-service.git
   cd product-service
   ```

2. **Configure environment variables:**

   Copy `.env.example` to `.env` and update values accordingly.

3. **Run services using Docker Compose:**

   The `docker-compose.yml` file will start the PostgreSQL database and the product service application.

   ```bash
   docker-compose up --build
   ```

   This command will:

   * Build and start the product service container
   * Start a PostgreSQL container with the database configured
   * Start the React based frontend service

4. **Access the API:**

   The service will be running at `http://localhost:5172`.

5. **To stop the containers:**

   ```bash
   docker-compose down
   ```
---

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

---

## Ingestion Logic

The service periodically ingests product data from an external WooCommerce API and stores it into the local PostgreSQL database.

* Fetches product data via scheduled tasks every 7 days.
* Parses and validates product information.
* Converts product price strings into doubles, handling empty or missing values gracefully.
* Inserts or updates product records in the database.

This ingestion ensures the product catalog stays up to date for segmentation queries.

---

## Sample Input for Segmentation

The segmentation API endpoint accepts a condition string to filter products dynamically.

Example POST request to `/segments/evaluate` with JSON body:

```json
{
  "condition": "price > 50 AND category = 'electronics'"
}
```

Response: List of products matching the condition.

## Swagger API Documentation

API documentation is available via Swagger UI.

* Access Swagger UI at:
  `http://localhost:8080/swagger-ui/index.html`

* The Swagger JSON spec is served at:
  `http://localhost:8080/v3/api-docs`

This allows easy exploration and testing of all REST endpoints exposed by the service.

---

