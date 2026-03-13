package com.enviro.assessment.inter001.brianmthembu.service;

import com.enviro.assessment.inter001.brianmthembu.dto.WasteRecordDTO;
import com.enviro.assessment.inter001.brianmthembu.mapper.WasteRecordMapper;
import com.enviro.assessment.inter001.brianmthembu.model.WasteRecord;
import com.enviro.assessment.inter001.brianmthembu.repository.WasteRecordRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WasteRecordService {

    private final WasteRecordRepository repository;
    private final WasteRecordMapper mapper;

    public WasteRecordDTO createWasteRecord(WasteRecordDTO dto) {

        WasteRecord entity = mapper.toEntity(dto);
        WasteRecord saved = repository.save(entity);
        return mapper.toDTO(saved);
    }

    public List<WasteRecordDTO> getAllWasteRecords() {

        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    public WasteRecordDTO getWasteRecordById(Long id) {
        WasteRecord record = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Waste record not found"));
        return mapper.toDTO(record);
    }

    public void deleteWasteRecord(Long id) {
        if (!repository.existsById(id))
            throw new EntityNotFoundException("Recycling bin not found with id: " + id);

        repository.deleteById(id);
    }

    public WasteRecordDTO updateRecord(Long id, WasteRecordDTO dto) {
        WasteRecord record = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Waste record not found with id: " + id));

        record.setWasteType(dto.getWasteType());
        record.setQuantity(dto.getQuantity());
        record.setDisposalDate(dto.getDisposalDate());

        return mapper.toDTO(repository.save(record));
    }
}