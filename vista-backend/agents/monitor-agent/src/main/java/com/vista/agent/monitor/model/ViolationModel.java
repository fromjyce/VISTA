package com.vista.agent.monitor.model;

import java.time.LocalDateTime;

public class ViolationModel {

    private String violationType;
    private String detectedValue;
    private String controlId;
    private String severity;
    private double confidence;
    private LocalDateTime detectedAt;

    public ViolationModel(String violationType,
                          String detectedValue,
                          String controlId,
                          String severity,
                          double confidence) {
        this.violationType = violationType;
        this.detectedValue = detectedValue;
        this.controlId = controlId;
        this.severity = severity;
        this.confidence = confidence;
        this.detectedAt = LocalDateTime.now();
    }

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
