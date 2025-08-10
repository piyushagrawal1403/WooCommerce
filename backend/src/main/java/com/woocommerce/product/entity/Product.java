package com.woocommerce.product.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonSetter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Double price;
    private String stockStatus;
    private Integer stockQuantity;
    private String category;

    @ElementCollection
    private List<String> tags;

    private boolean onSale;

    private LocalDateTime createdAt;

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Double getPrice() { return price; }
    @JsonSetter("price")
    public void setPrice(String price) {
        if (price == null || price.trim().isEmpty()) {
            this.price = 0.0;
        } else {
            String cleaned = price.replaceAll("[^\\d.]", "");
            this.price = cleaned.isEmpty() ? 0.0 : Double.parseDouble(cleaned);
        }
    }

    public String getStockStatus() { return stockStatus; }
    public void setStockStatus(String stockStatus) { this.stockStatus = stockStatus; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public boolean isOnSale() { return onSale; }
    public void setOnSale(boolean onSale) { this.onSale = onSale; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
