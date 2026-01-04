package com.vista.agent.watcher.scheduler;

import com.vista.agent.watcher.model.RegulationSourceModel;
import com.vista.agent.watcher.publisher.RegulationEventPublisher;
import com.vista.agent.watcher.service.RegulationDiffService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class RegulationPoller {

    private final RegulationDiffService diffService;
    private final RegulationEventPublisher publisher;

    public RegulationPoller(RegulationDiffService diffService,
                            RegulationEventPublisher publisher) {
        this.diffService = diffService;
        this.publisher = publisher;
    }

    @Scheduled(fixedDelay = 21600000)
    public void pollRegulationSource() {

        RegulationSourceModel current = new RegulationSourceModel(
                "PCI DSS",
                "4.0",
                "hash-123456",
                LocalDateTime.now()
        );

        boolean changed = diffService.hasRegulationChanged(current);

        if (changed) {
            publisher.publishRegulationUpdate(
                    current.getRegulationName(),
                    "3.2.1",
                    current.getVersion(),
                    "Detected update in PCI DSS requirements"
            );
        }
    }
}
