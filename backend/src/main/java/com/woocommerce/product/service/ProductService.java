package com.woocommerce.product.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.woocommerce.product.entity.Product;
import com.woocommerce.product.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;

import java.util.*;

@Service
public class ProductService {
    private final ProductRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${woocommerce.url}")
    private String baseUrl;
    @Value("${woocommerce.consumerKey}")
    private String key;
    @Value("${woocommerce.consumerSecret}")
    private String secret;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public void fetchProducts() {
        String url = baseUrl + "/wp-json/wc/v3/products?consumer_key=" + key + "&consumer_secret=" + secret;
        try {
            String json = restTemplate.getForObject(url, String.class);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode nodes = mapper.readTree(json);

            for (JsonNode node : nodes) {
                Product p = new Product();
                p.setId(node.get("id").asLong());
                p.setTitle(node.get("name").asText());
                p.setPrice(node.get("price").asText());
                p.setStockStatus(node.get("stock_status").asText());
                p.setStockQuantity(node.get("stock_quantity").isNull() ? null : node.get("stock_quantity").asInt());
                p.setCategory(node.withArray("categories").size() > 0 ? node.withArray("categories").get(0).get("name").asText() : "");
                p.setTags(new ArrayList<>());
                node.withArray("tags").forEach(tag -> p.getTags().add(tag.get("name").asText()));
                p.setOnSale(node.get("on_sale").asBoolean());
                p.setCreatedAt(LocalDateTime.parse(node.get("date_created").asText()));

                repository.save(p);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Product> getAll() {
        return repository.findAll();
    }
}
