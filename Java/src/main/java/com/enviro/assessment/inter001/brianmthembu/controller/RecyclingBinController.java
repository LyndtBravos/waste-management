package com.enviro.assessment.inter001.brianmthembu.controller;

import com.enviro.assessment.inter001.brianmthembu.dto.RecyclingBinDTO;
import com.enviro.assessment.inter001.brianmthembu.service.RecyclingBinService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bins")
@RequiredArgsConstructor
public class RecyclingBinController {

    private final RecyclingBinService service;

    @Operation(summary = "Create a new recycling bin location")
    @PostMapping
    public ResponseEntity<RecyclingBinDTO> createBin(
            @Valid @RequestBody RecyclingBinDTO dto) {

        return ResponseEntity.ok(service.createBin(dto));
    }

    @Operation(summary = "Retrieve all recycling bins")
    @GetMapping
    public ResponseEntity<List<RecyclingBinDTO>> getAllBins() {

        return ResponseEntity.ok(service.getAllBins());
    }

    @Operation(summary = "Retrieve a recycling bin by ID")
    @GetMapping("/{id}")
    public ResponseEntity<RecyclingBinDTO> getBin(@PathVariable Long id) {

        return ResponseEntity.ok(service.getBinById(id));
    }

    @Operation(summary = "Edit the existing recycling bin")
    @PutMapping("/{id}")
    public ResponseEntity<RecyclingBinDTO> updateBin(@PathVariable Long id, @Valid @RequestBody RecyclingBinDTO body) {
        return ResponseEntity.ok(service.updateBin(id, body));
    }

    @Operation(summary = "Delete a recycling bin by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBin(@PathVariable Long id) {
        service.deleteBin(id);
        return ResponseEntity.noContent().build();
    }
}