package com.woocommerce.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.woocommerce.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

