package com.vista.agent.interpreter.ai;

import com.vista.agent.interpreter.model.ParsedControlModel;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GeminiPolicyInterpreter {

    public List<ParsedControlModel> interpret(String regulationText) {

        // MOCK Gemini response for POC
        return List.of(
                new ParsedControlModel(
                        "PCI-3.4.2",
                        "Mask PAN when displayed",
                        "HIGH",
                        "Stored card data"
                )
        );
    }
}
