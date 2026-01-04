package com.vista.agent.interpreter.model;

public class ParsedControlModel {

    private String controlId;
    private String description;
    private String severity;
    private String scope;

    public ParsedControlModel(String controlId,
                              String description,
                              String severity,
                              String scope) {
        this.controlId = controlId;
        this.description = description;
        this.severity = severity;
        this.scope = scope;
    }

    public String getControlId() {
        return controlId;
    }

    public String getDescription() {
        return description;
    }

    public String getSeverity() {
        return severity;
    }

    public String getScope() {
        return scope;
    }
}
