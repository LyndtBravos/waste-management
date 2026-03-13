package com.enviro.assessment.inter001.brianmthembu.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
class ApiError {
    private int status;
    private String error;
    private String message;
    private LocalDateTime timestamp;
}