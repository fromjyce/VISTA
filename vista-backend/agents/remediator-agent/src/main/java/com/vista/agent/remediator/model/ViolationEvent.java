package com.vista.agent.remediator.model;

import java.time.LocalDateTime;

public class ViolationEvent {

    private String violationType;
    private String detectedValue;
    private String controlId;
    private String severity;
    private double confidence;
    private LocalDateTime detectedAt;

    public String getViolationType() {
        return violationType;
    }

    public String getDetectedValue() {
        return detectedValue;
    }

    public String getControlId() {
        return controlId;
    }

    public String getSeverity() {
        return severity;
    }

    public double getConfidence() {
        return confidence;
    }

    public LocalDateTime getDetectedAt() {
        return detectedAt;
    }
}
