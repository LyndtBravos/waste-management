package com.enviro.assessment.inter001.brianmthembu.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PickupStatus {

    PENDING("Pending"),
    SCHEDULED("Scheduled"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled");

    private final String value;
}