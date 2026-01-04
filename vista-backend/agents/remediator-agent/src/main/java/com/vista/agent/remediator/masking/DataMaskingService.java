package com.vista.agent.remediator.masking;

import org.springframework.stereotype.Service;

@Service
public class DataMaskingService {

    public String maskPan(String pan) {

        if (pan.length() < 10) {
            return "****";
        }

        return pan.substring(0, 6) +
               "******" +
               pan.substring(pan.length() - 4);
    }
}
