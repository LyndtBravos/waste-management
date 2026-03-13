package com.enviro.assessment.inter001.brianmthembu.mapper;

import com.enviro.assessment.inter001.brianmthembu.dto.PickupRequestDTO;
import com.enviro.assessment.inter001.brianmthembu.model.PickupRequest;

import org.springframework.stereotype.Component;

@Component
public class PickupRequestMapper {

    public PickupRequestDTO toDTO(PickupRequest entity) {
        PickupRequestDTO dto = new PickupRequestDTO();

        dto.setId(entity.getId());
        dto.setWasteType(entity.getWasteType());
        dto.setPickupDate(entity.getPickupDate());
        dto.setAddress(entity.getAddress());
        dto.setNotes(entity.getNotes());
        dto.setStatus(entity.getStatus());

        return dto;
    }

    public PickupRequest toEntity(PickupRequestDTO dto) {
        PickupRequest entity = new PickupRequest();

        entity.setId(dto.getId());
        entity.setWasteType(dto.getWasteType());
        entity.setPickupDate(dto.getPickupDate());
        entity.setAddress(dto.getAddress());
        entity.setNotes(dto.getNotes());
        entity.setStatus(dto.getStatus());

        return entity;
    }
}