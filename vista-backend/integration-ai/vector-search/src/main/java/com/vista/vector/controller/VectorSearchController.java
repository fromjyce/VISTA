package com.vista.vector.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VectorSearchController {

    @GetMapping("/vector-search")
    public String searchVectors() {
        return "Vector search executed";
    }
}
