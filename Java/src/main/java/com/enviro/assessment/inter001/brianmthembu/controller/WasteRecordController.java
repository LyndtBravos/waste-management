package com.enviro.assessment.inter001.brianmthembu.controller;

import com.enviro.assessment.inter001.brianmthembu.dto.WasteRecordDTO;
import com.enviro.assessment.inter001.brianmthembu.service.WasteRecordService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waste")
@RequiredArgsConstructor
public class WasteRecordController {

    private final WasteRecordService service;

    @Operation(summary = "Create a new waste record")
    @PostMapping
    public ResponseEntity<WasteRecordDTO> createWasteRecord(
            @Valid @RequestBody WasteRecordDTO dto) {

        return ResponseEntity.ok(service.createWasteRecord(dto));
    }

    @Operation(summary = "Retrieve all waste records")
    @GetMapping
    public ResponseEntity<List<WasteRecordDTO>> getAllWasteRecords() {

        return ResponseEntity.ok(service.getAllWasteRecords());
    }

    @Operation(summary = "Retrieve a waste record by ID")
    @GetMapping("/{id}")
    public ResponseEntity<WasteRecordDTO> getWasteRecord(@PathVariable Long id) {

        return ResponseEntity.ok(service.getWasteRecordById(id));
    }

    @Operation(summary = "Delete a waste record by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWasteRecord(@PathVariable Long id) {

        service.deleteWasteRecord(id);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update a waste record by ID")
    @PutMapping("/{id}")
    public ResponseEntity<WasteRecordDTO> updateRecord(@PathVariable Long id,
                                                       @Valid @RequestBody WasteRecordDTO dto ) {
        return ResponseEntity.ok(service.updateRecord(id, dto));
    }
}