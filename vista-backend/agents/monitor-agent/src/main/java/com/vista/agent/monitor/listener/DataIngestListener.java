package com.vista.agent.monitor.listener;

import com.vista.agent.monitor.model.ViolationModel;
import com.vista.agent.monitor.service.ScanExecutionService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class DataIngestListener {

    private final ScanExecutionService scanService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public DataIngestListener(ScanExecutionService scanService,
                              KafkaTemplate<String, Object> kafkaTemplate) {
        this.scanService = scanService;
        this.kafkaTemplate = kafkaTemplate;
    }

    @KafkaListener(topics = "data.ingested", groupId = "monitor-agent")
    public void consume(String payload) {

        ViolationModel violation = scanService.scan(payload);

        if (violation != null) {
            kafkaTemplate.send("violation.detected", violation);
        }
    }
}
