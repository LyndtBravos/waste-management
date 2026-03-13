package com.enviro.assessment.inter001.brianmthembu.dto;

import com.enviro.assessment.inter001.brianmthembu.model.PickupStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PickupRequestDTO {

    private Long id;

    @NotBlank(message = "Waste type is required")
    private String wasteType;

    @NotNull(message = "Pickup date is required")
    @FutureOrPresent(message = "Pickup date cannot be in the past")
    private LocalDate pickupDate;

    @NotBlank(message = "Address is required")
    private String address;

    private String notes;

    private PickupStatus status;
}