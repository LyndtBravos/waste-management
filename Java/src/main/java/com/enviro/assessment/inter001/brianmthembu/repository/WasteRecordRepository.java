package com.enviro.assessment.inter001.brianmthembu.repository;

import com.enviro.assessment.inter001.brianmthembu.model.WasteRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WasteRecordRepository extends JpaRepository<WasteRecord, Long> {

}