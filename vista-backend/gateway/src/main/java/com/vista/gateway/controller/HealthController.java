package com.vista.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import reactor.core.publisher.Mono;
import java.util.Map;
import java.time.Instant;

@RestController
public class HealthController {
    
    @GetMapping("/health")
    public Mono<ResponseEntity<Map<String, String>>> health() {
        return Mono.just(ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "vista-gateway",
            "timestamp", Instant.now().toString()
        )));
    }

    @GetMapping("/test")
public Mono<ResponseEntity<Map<String, String>>> test() {
    return Mono.just(ResponseEntity.ok(Map.of(
        "message", "Hello from VISTA Gateway!",
        "status", "SUCCESS",
        "timestamp", Instant.now().toString()
    )));
}
}