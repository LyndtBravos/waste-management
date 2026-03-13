package com.enviro.assessment.inter001.brianmthembu.dto;

//{
//        "totalKg": 27,
//        "breakdown": [
//        { "wasteType": "Plastic", "quantity": 5 },
//        { "wasteType": "Glass", "quantity": 8 },
//        { "wasteType": "Metal", "quantity": 7 },
//        { "wasteType": "Organic", "quantity": 7 }
//        ]
//        }

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class WasteSummaryDTO {
    private double totalKg;
    private WasteRecordDTO[] breakdown;
}
