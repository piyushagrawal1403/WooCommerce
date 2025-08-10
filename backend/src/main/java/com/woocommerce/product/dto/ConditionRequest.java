package com.woocommerce.product.dto;

public class ConditionRequest {
    private String condition;
    
    public ConditionRequest() {}

    
    public String getCondition() {
        return this.condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    @Override
    public String toString() {
        return "ConditionRequest{condition='" + condition + "'}";
    }
}
