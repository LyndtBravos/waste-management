package com.enviro.assessment.inter001.brianmthembu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WasteRecordDTO {

    private Long id;

    @NotBlank(message = "Waste type is required")
    private String wasteType;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be greater than zero")
    private Double quantity;

    @NotNull(message = "Disposal date is required")
    @PastOrPresent(message = "Disposal date cannot be in the future")
    private LocalDate disposalDate;

    public WasteRecordDTO(String key, double value) {
        this.wasteType = key;
        this.quantity = value;
    }
}