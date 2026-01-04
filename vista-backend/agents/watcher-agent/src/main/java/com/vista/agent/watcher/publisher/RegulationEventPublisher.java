package com.vista.agent.watcher.publisher;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class RegulationEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public RegulationEventPublisher(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishRegulationUpdate(String regulation,
                                        String oldVersion,
                                        String newVersion,
                                        String summary) {

        Map<String, Object> event = new HashMap<>();
        event.put("eventType", "regulation.updated");
        event.put("regulation", regulation);
        event.put("oldVersion", oldVersion);
        event.put("newVersion", newVersion);
        event.put("summary", summary);
        event.put("timestamp", LocalDateTime.now().toString());

        kafkaTemplate.send("regulation.updated", event);
    }
}
