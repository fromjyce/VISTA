package com.vista.audit.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuditLedgerController {

    @GetMapping("/audit-ledger")
    public String getAuditLogs() {
        return "List of audit logs";
    }
}
