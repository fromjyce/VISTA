package com.vista.agent.watcher.model;

import java.time.LocalDateTime;

public class RegulationSourceModel {

    private String regulationName;
    private String version;
    private String contentHash;
    private LocalDateTime lastUpdated;

    public RegulationSourceModel(String regulationName,
                                 String version,
                                 String contentHash,
                                 LocalDateTime lastUpdated) {
        this.regulationName = regulationName;
        this.version = version;
        this.contentHash = contentHash;
        this.lastUpdated = lastUpdated;
    }

    public String getRegulationName() {
        return regulationName;
    }

    public String getVersion() {
        return version;
    }

    public String getContentHash() {
        return contentHash;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }
}
