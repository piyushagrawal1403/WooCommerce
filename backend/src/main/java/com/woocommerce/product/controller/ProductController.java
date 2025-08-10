package com.woocommerce.product.controller;

import org.springframework.web.bind.annotation.*;

import com.woocommerce.product.entity.Product;
import com.woocommerce.product.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@Tag(name = "Product Ingestion", description = "Endpoints to trigger product ingestion")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/products")
    @Operation(summary = "Fetch all the productsin the database", description = "Fetches all products in the database")
    public List<Product> getAll() {
        return service.getAll();
    }

    @PostMapping("/ingest")
    @Operation(summary = "Trigger manual product ingestion", description = "Fetches products manually by calling the service method.")
    public String ingestProducts() {
        service.fetchProducts();
        return "Product ingestion triggered successfully.";
    }
}
