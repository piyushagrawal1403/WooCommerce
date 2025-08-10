package com.woocommerce.product.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.woocommerce.product.service.ProductService;

@Component
public class SchedulerConfig {

    private final ProductService service;

    public SchedulerConfig(ProductService service) {
        this.service = service;
    }

    @Scheduled(fixedRate = 6.048e+8)
    public void scheduledIngest() {
        service.fetchProducts();
    }
}
