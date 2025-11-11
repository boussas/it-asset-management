package com.assetmanagement.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;
import java.util.stream.Collectors;

public enum AssetStatus {
    IN_USE("In Use"),
    IN_STORAGE("In Storage"),
    IN_REPAIR("In Repair"),
    DECOMMISSIONED("Decommissioned");

    private final String displayName;

    AssetStatus(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static AssetCategory fromDisplayName(String displayName) {
        if (displayName == null || displayName.trim().isEmpty()) {
            throw new IllegalArgumentException("Category value cannot be null or empty");
        }

        String trimmed = displayName.trim();

        for (AssetCategory category : AssetCategory.values()) {
            if (category.getDisplayName().equalsIgnoreCase(trimmed)) {
                return category;
            }
            if (category.name().equalsIgnoreCase(trimmed)) {
                return category;
            }
        }

        throw new IllegalArgumentException("Unknown asset category: '" + displayName + "'. Expected one of: " +
                Arrays.stream(AssetCategory.values())
                        .map(AssetCategory::getDisplayName)
                        .collect(Collectors.joining(", ")));
    }
}