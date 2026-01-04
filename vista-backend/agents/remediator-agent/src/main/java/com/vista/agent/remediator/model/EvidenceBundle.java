package com.vista.agent.remediator.model;

import java.time.LocalDateTime;

public class EvidenceBundle {

    private String violationType;
    private String controlId;
    private String originalValue;
    private String maskedValue;
    private String explanation;
    private LocalDateTime remediationTime;

    public EvidenceBundle(String violationType,
                          String controlId,
                          String originalValue,
                          String maskedValue,
                          String explanation) {

        this.violationType = violationType;
        this.controlId = controlId;
        this.originalValue = originalValue;
        this.maskedValue = maskedValue;
        this.explanation = explanation;
        this.remediationTime = LocalDateTime.now();
    }

    public String getViolationType() {
        return violationType;
    }

    public String getControlId() {
        return controlId;
    }

    public String getOriginalValue() {
        return originalValue;
    }

    public String getMaskedValue() {
        return maskedValue;
    }

    public String getExplanation() {
        return explanation;
    }

    public LocalDateTime getRemediationTime() {
        return remediationTime;
    }
}
