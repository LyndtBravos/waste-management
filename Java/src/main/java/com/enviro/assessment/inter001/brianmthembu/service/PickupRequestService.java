package com.enviro.assessment.inter001.brianmthembu.service;

import com.enviro.assessment.inter001.brianmthembu.dto.PickupRequestDTO;
import com.enviro.assessment.inter001.brianmthembu.mapper.PickupRequestMapper;
import com.enviro.assessment.inter001.brianmthembu.model.PickupRequest;
import com.enviro.assessment.inter001.brianmthembu.model.PickupStatus;
import com.enviro.assessment.inter001.brianmthembu.repository.PickupRequestRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PickupRequestService {

    private final PickupRequestRepository repository;
    private final PickupRequestMapper mapper;

    public PickupRequestDTO createPickupRequest(PickupRequestDTO dto) {

        PickupRequest entity = mapper.toEntity(dto);

        if (entity.getStatus() == null)
            entity.setStatus(PickupStatus.PENDING);

        PickupRequest saved = repository.save(entity);

        return mapper.toDTO(saved);
    }

    public List<PickupRequestDTO> getAllPickupRequests() {

        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    public PickupRequestDTO getPickupRequestById(Long id) {

        PickupRequest request = repository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Pickup request not found with id: " + id));

        return mapper.toDTO(request);
    }

    public PickupRequestDTO updateStatus(Long id, PickupStatus status) {

        PickupRequest request = repository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Pickup request not found with id: " + id));

        request.setStatus(status);

        PickupRequest updated = repository.save(request);

        return mapper.toDTO(updated);
    }

    public void deletePickupRequest(Long id) {

        if (!repository.existsById(id))
            throw new EntityNotFoundException("Pickup request not found with id: " + id);


        repository.deleteById(id);
    }
}