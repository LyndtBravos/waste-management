package com.enviro.assessment.inter001.brianmthembu.controller;

import com.enviro.assessment.inter001.brianmthembu.dto.WasteRecordDTO;
import com.enviro.assessment.inter001.brianmthembu.dto.WasteSummaryDTO;
import com.enviro.assessment.inter001.brianmthembu.model.WasteRecord;
import com.enviro.assessment.inter001.brianmthembu.repository.PickupRequestRepository;
import com.enviro.assessment.inter001.brianmthembu.repository.WasteRecordRepository;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final WasteRecordRepository wasteRepository;
    private final PickupRequestRepository pickupRepository;

    @Operation(summary = "Get total waste grouped by type")
    @GetMapping("/waste-by-type")
    public Map<String, Long> wasteByType() {

        return wasteRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        WasteRecord::getWasteType,
                        Collectors.counting()
                ));
    }

    @Operation(summary="Get total waste in kilos")
    @GetMapping("/waste-sum")
    public ResponseEntity<WasteSummaryDTO> wasteSum() {
        WasteSummaryDTO summary = new WasteSummaryDTO();
        List<WasteRecord> wasteRecords = wasteRepository.findAll();

        summary.setTotalKg(wasteRecords.stream()
                        .mapToDouble(WasteRecord::getQuantity)
                        .sum());

        Map<String, Double> map = wasteRecords.stream()
                .collect(Collectors.groupingBy(
                        WasteRecord::getWasteType,
                        Collectors.summingDouble(WasteRecord::getQuantity)
                ));

        WasteRecordDTO[] breakdown = map.entrySet()
                .stream()
                .map(entry -> new WasteRecordDTO(entry.getKey(), entry.getValue()))
                .toArray(WasteRecordDTO[]::new);

        summary.setBreakdown(breakdown);

        return ResponseEntity.ok(summary);
    }

    @Operation(summary = "Get total waste grouped by date")
    @GetMapping("/waste-by-date")
    public Map<LocalDate, Long> wasteByDate() {

        return wasteRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        WasteRecord::getDisposalDate,
                        Collectors.counting()
                ));
    }

    @Operation(summary = "Get pickup request count by status")
    @GetMapping("/waste-by-status")
    public Map<String, Long> pickupByStatus() {

        return pickupRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        a -> a.getStatus().getValue(),
                        Collectors.counting()
                ));
    }
}