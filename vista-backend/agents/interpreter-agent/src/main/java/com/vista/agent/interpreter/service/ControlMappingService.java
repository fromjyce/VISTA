package com.vista.agent.interpreter.service;

import com.vista.agent.interpreter.ai.GeminiPolicyInterpreter;
import com.vista.agent.interpreter.model.ParsedControlModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ControlMappingService {

    private final GeminiPolicyInterpreter interpreter;

    public ControlMappingService(GeminiPolicyInterpreter interpreter) {
        this.interpreter = interpreter;
    }

    public void processRegulation(Map<String, Object> event) {

        String regulationText = (String) event.get("summary");

        List<ParsedControlModel> controls =
                interpreter.interpret(regulationText);

        controls.forEach(control -> {
            System.out.println("Created control: " + control.getControlId());
        });

        // Next step: publish controls.updated (Agent-3 listens)
    }
}
