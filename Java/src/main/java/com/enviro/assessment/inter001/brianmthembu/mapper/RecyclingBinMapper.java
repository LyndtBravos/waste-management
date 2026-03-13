package com.enviro.assessment.inter001.brianmthembu.mapper;

import com.enviro.assessment.inter001.brianmthembu.dto.RecyclingBinDTO;
import com.enviro.assessment.inter001.brianmthembu.model.RecyclingBin;
import org.springframework.stereotype.Component;

@Component
public class RecyclingBinMapper {

    public RecyclingBinDTO toDTO(RecyclingBin entity) {

        RecyclingBinDTO dto = new RecyclingBinDTO();

        dto.setId(entity.getId());
        dto.setLocationName(entity.getLocationName());
        dto.setAddress(entity.getAddress());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setWasteTypesAccepted(entity.getWasteTypesAccepted());

        return dto;
    }

    public RecyclingBin toEntity(RecyclingBinDTO dto) {

        RecyclingBin entity = new RecyclingBin();

        entity.setId(dto.getId());
        entity.setLocationName(dto.getLocationName());
        entity.setAddress(dto.getAddress());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setWasteTypesAccepted(dto.getWasteTypesAccepted());

        return entity;
    }
}