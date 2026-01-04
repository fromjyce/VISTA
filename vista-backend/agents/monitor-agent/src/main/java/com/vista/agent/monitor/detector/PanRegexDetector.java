package com.vista.agent.monitor.detector;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PanRegexDetector {

    private static final Pattern PAN_PATTERN =
            Pattern.compile("\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})\\b");

    public String detect(String input) {
        Matcher matcher = PAN_PATTERN.matcher(input);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }
}
