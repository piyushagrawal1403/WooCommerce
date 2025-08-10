package com.woocommerce.product.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestBody;

import com.woocommerce.product.dto.ConditionRequest;
import com.woocommerce.product.service.SegmentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/segments")
@Tag(name = "Product Filetering", description = "Endpoints to trigger filter results from api")
public class SegmentController {

    private final SegmentService service;

    public SegmentController(SegmentService service) {
        this.service = service;
    }

    @PostMapping("/evaluate")
    @Operation(
        summary = "Trigger fetch resulting via filters",
        requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(
                    name = "Sample Request",
                    value = "{ \"condition\": \"price<'25'\" }"
                )
            )
        )
    )
    public List<Map<String, Object>> evaluate(@RequestBody ConditionRequest request) {
        System.out.println("Received body: " + request);
        System.out.println("Condition: " + request.getCondition());
        String condition = request.getCondition();
        return service.evaluateCondition(condition);
    }
}
