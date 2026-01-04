package com.vista.agent.remediator.service;

import com.vista.agent.remediator.explainability.GeminiExplanationService;
import com.vista.agent.remediator.masking.DataMaskingService;
import com.vista.agent.remediator.model.EvidenceBundle;
import com.vista.agent.remediator.model.ViolationEvent;
import org.springframework.stereotype.Service;

@Service
public class RemediationDecisionService {

    private final DataMaskingService maskingService;
    private final GeminiExplanationService explanationService;

    public RemediationDecisionService(DataMaskingService maskingService,
                                      GeminiExplanationService explanationService) {
        this.maskingService = maskingService;
        this.explanationService = explanationService;
    }

    public EvidenceBundle remediate(ViolationEvent event) {

        String masked = maskingService.maskPan(event.getDetectedValue());
        String explanation = explanationService.generateExplanation(event);

        return new EvidenceBundle(
                event.getViolationType(),
                event.getControlId(),
                event.getDetectedValue(),
                masked,
                explanation
        );
    }
}
