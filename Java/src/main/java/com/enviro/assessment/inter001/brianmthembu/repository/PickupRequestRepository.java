package com.enviro.assessment.inter001.brianmthembu.repository;

import com.enviro.assessment.inter001.brianmthembu.model.PickupRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PickupRequestRepository extends JpaRepository<PickupRequest, Long> {

}