package com.vista.agent.watcher.service;

import com.vista.agent.watcher.model.RegulationSourceModel;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class RegulationDiffService {

    private RegulationSourceModel lastKnownRegulation;

    public boolean hasRegulationChanged(RegulationSourceModel current) {

        if (lastKnownRegulation == null) {
            lastKnownRegulation = current;
            return true;
        }

        boolean changed = !Objects.equals(
                lastKnownRegulation.getContentHash(),
                current.getContentHash()
        );

        if (changed) {
            lastKnownRegulation = current;
        }

        return changed;
    }
}
