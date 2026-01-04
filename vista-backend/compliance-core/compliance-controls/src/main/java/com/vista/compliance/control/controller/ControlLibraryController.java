package com.vista.compliance.control.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControlLibraryController {

    @GetMapping("/controls")
    public String getAllControls() {
        return "List of all controls";
    }
}
