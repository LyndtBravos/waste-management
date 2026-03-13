package com.enviro.assessment.inter001.brianmthembu.mapper;

import com.enviro.assessment.inter001.brianmthembu.dto.WasteRecordDTO;
import com.enviro.assessment.inter001.brianmthembu.model.WasteRecord;
import org.springframework.stereotype.Component;

@Component
public class WasteRecordMapper {

    public WasteRecordDTO toDTO(WasteRecord entity) {
        WasteRecordDTO dto = new WasteRecordDTO();

        dto.setId(entity.getId());
        dto.setWasteType(entity.getWasteType());
        dto.setQuantity(entity.getQuantity());
        dto.setDisposalDate(entity.getDisposalDate());

        return dto;
    }

    public WasteRecord toEntity(WasteRecordDTO dto) {
        WasteRecord entity = new WasteRecord();

        entity.setId(dto.getId());
        entity.setWasteType(dto.getWasteType());
        entity.setQuantity(dto.getQuantity());
        entity.setDisposalDate(dto.getDisposalDate());

        return entity;
    }
}