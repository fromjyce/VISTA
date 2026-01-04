package com.vista.agent.interpreter.listener;

import com.vista.agent.interpreter.service.ControlMappingService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class RegulationEventListener {

    private final ControlMappingService mappingService;

    public RegulationEventListener(ControlMappingService mappingService) {
        this.mappingService = mappingService;
    }

    @KafkaListener(topics = "regulation.updated", groupId = "interpreter-agent")
    public void onRegulationUpdate(Map<String, Object> event) {
        mappingService.processRegulation(event);
    }
}
