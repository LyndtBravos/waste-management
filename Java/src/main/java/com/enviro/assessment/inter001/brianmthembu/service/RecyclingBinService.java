package com.enviro.assessment.inter001.brianmthembu.service;

import com.enviro.assessment.inter001.brianmthembu.dto.PickupRequestDTO;
import com.enviro.assessment.inter001.brianmthembu.dto.RecyclingBinDTO;
import com.enviro.assessment.inter001.brianmthembu.mapper.RecyclingBinMapper;
import com.enviro.assessment.inter001.brianmthembu.model.PickupRequest;
import com.enviro.assessment.inter001.brianmthembu.model.PickupStatus;
import com.enviro.assessment.inter001.brianmthembu.model.RecyclingBin;
import com.enviro.assessment.inter001.brianmthembu.repository.RecyclingBinRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecyclingBinService {

    private final RecyclingBinRepository repository;
    private final RecyclingBinMapper mapper;

    public RecyclingBinDTO createBin(RecyclingBinDTO dto) {

        RecyclingBin entity = mapper.toEntity(dto);
        RecyclingBin saved = repository.save(entity);
        return mapper.toDTO(saved);
    }

    public RecyclingBinDTO updateBin(Long id, RecyclingBinDTO dto) {

        RecyclingBin request = repository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Recycling Bin not found with id: " + id));

        request.setLatitude(dto.getLatitude());
        request.setLongitude(dto.getLongitude());
        request.setAddress(dto.getAddress());
        request.setLocationName(dto.getLocationName());
        request.setWasteTypesAccepted(dto.getWasteTypesAccepted());

        return mapper.toDTO(repository.save(request));
    }

    public List<RecyclingBinDTO> getAllBins() {
        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    public RecyclingBinDTO getBinById(Long id) {

        RecyclingBin bin = repository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Recycling bin not found with id: " + id));

        return mapper.toDTO(bin);
    }

    public void deleteBin(Long id) {

        if (!repository.existsById(id))
            throw new EntityNotFoundException("Recycling bin not found with id: " + id);

        repository.deleteById(id);
    }
}