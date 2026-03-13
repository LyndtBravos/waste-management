package com.enviro.assessment.inter001.brianmthembu.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PickupRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String wasteType;

    @Column(nullable = false)
    private LocalDate pickupDate;

    @Column(nullable = false)
    private String address;

    private String notes;

    @Enumerated(EnumType.STRING)
    private PickupStatus status;
}