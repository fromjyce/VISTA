package com.vista.rag.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RAGServiceController {

    @GetMapping("/rag")
    public String processDocument() {
        return "Document processed with RAG service";
    }
}
