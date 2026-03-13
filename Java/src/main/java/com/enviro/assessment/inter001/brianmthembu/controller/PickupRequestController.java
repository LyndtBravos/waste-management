package com.enviro.assessment.inter001.brianmthembu.controller;

import com.enviro.assessment.inter001.brianmthembu.dto.PickupRequestDTO;
import com.enviro.assessment.inter001.brianmthembu.model.PickupStatus;
import com.enviro.assessment.inter001.brianmthembu.service.PickupRequestService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pickups")
@RequiredArgsConstructor
public class PickupRequestController {

    private final PickupRequestService service;

    @Operation(summary = "Create a pickup request")
    @PostMapping
    public ResponseEntity<PickupRequestDTO> createPickupRequest(
            @Valid @RequestBody PickupRequestDTO dto) {
        return ResponseEntity.ok(service.createPickupRequest(dto));
    }

    @Operation(summary = "Retrieve all pickup requests")
    @GetMapping
    public ResponseEntity<List<PickupRequestDTO>> getAllPickupRequests() {
        return ResponseEntity.ok(service.getAllPickupRequests());
    }

    @Operation(summary = "Retrieve a pickup request by ID")
    @GetMapping("/{id}")
    public ResponseEntity<PickupRequestDTO> getPickupRequest(@PathVariable Long id) {
        return ResponseEntity.ok(service.getPickupRequestById(id));
    }

    @Operation(summary = "Update the status of a pickup request")
    @PutMapping("/{id}/status")
    public ResponseEntity<PickupRequestDTO> updateStatus(
            @PathVariable Long id,
            @RequestBody String status) {
        return ResponseEntity.ok(
                service.updateStatus(id, PickupStatus.valueOf(status.toUpperCase())));
    }

    @Operation(summary = "Delete a pickup request")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePickupRequest(@PathVariable Long id){
        service.deletePickupRequest(id);
        return ResponseEntity.noContent().build();
    }
}