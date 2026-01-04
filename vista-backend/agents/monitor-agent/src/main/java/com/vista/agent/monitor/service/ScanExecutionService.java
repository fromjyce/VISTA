package com.vista.agent.monitor.service;

import com.vista.agent.monitor.detector.LuhnValidator;
import com.vista.agent.monitor.detector.PanRegexDetector;
import com.vista.agent.monitor.detector.ViolationClassifier;
import com.vista.agent.monitor.model.ViolationModel;
import org.springframework.stereotype.Service;

@Service
public class ScanExecutionService {

    private final PanRegexDetector panDetector = new PanRegexDetector();
    private final LuhnValidator luhnValidator = new LuhnValidator();
    private final ViolationClassifier classifier = new ViolationClassifier();

    public ViolationModel scan(String payload) {

        String pan = panDetector.detect(payload);
        if (pan == null) {
            return null;
        }

        if (!luhnValidator.isValid(pan)) {
            return null;
        }

        return classifier.classifyPan(pan);
    }
}
