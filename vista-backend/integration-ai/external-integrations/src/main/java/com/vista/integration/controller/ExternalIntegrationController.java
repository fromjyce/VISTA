package com.vista.integration.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExternalIntegrationController {

    @GetMapping("/external-integration")
    public String integrateExternalService() {
        return "External service integrated";
    }
}
