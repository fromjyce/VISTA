package com.vista.agent.monitor.detector;

import com.vista.agent.monitor.model.ViolationModel;

public class ViolationClassifier {

    public ViolationModel classifyPan(String pan) {
        return new ViolationModel(
                "PAN_EXPOSED",
                pan,
                "PCI-3.4.2",
                "HIGH",
                0.99
        );
    }
}
