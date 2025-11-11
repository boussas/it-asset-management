package com.assetmanagement.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum AssetCategory {
    LAPTOP("Laptop"),
    DESKTOP("Desktop"),
    MONITOR("Monitor"),
    PHONE("Phone"),
    TABLET("Tablet"),
    KEYBOARD("Keyboard"),
    MOUSE("Mouse"),
    PRINTER("Printer"),
    SERVER("Server"),
    NETWORK_DEVICE("Network Device"),
    OTHER("Other");

    private final String displayName;

    AssetCategory(String displayName) {
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
            if (category.displayName.equalsIgnoreCase(trimmed)) {
                return category;
            }
            if (category.name().equalsIgnoreCase(trimmed)) {
                return category;
            }
        }

        throw new IllegalArgumentException("Unknown asset category: " + displayName);
    }
}