package com.vista.agent.remediator.explainability;

import com.vista.agent.remediator.model.ViolationEvent;
import org.springframework.stereotype.Service;

@Service
public class GeminiExplanationService {

    public String generateExplanation(ViolationEvent event) {

        // For POC: deterministic explanation
        // In production: call Gemini with strict prompt

        return String.format(
                "A %s violation was detected. The value matched PCI patterns and passed checksum validation. " +
                "Control %s requires masking of cardholder data. The value was masked to comply with the control.",
                event.getViolationType(),
                event.getControlId()
        );
    }
}
