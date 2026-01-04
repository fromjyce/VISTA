package com.vista.agent.remediator.listener;

import com.vista.agent.remediator.model.EvidenceBundle;
import com.vista.agent.remediator.model.ViolationEvent;
import com.vista.agent.remediator.service.RemediationDecisionService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class ViolationListener {

    private final RemediationDecisionService remediationService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public ViolationListener(RemediationDecisionService remediationService,
                             KafkaTemplate<String, Object> kafkaTemplate) {
        this.remediationService = remediationService;
        this.kafkaTemplate = kafkaTemplate;
    }

    @KafkaListener(topics = "violation.detected", groupId = "remediator-agent")
    public void consume(ViolationEvent event) {

        EvidenceBundle evidence = remediationService.remediate(event);

        kafkaTemplate.send("evidence.generated", evidence);
    }
}
