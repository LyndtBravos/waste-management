package com.enviro.assessment.inter001.brianmthembu.controller;

import com.enviro.assessment.inter001.brianmthembu.dto.LoginRequest;
import com.enviro.assessment.inter001.brianmthembu.dto.RegisterRequest;

import com.enviro.assessment.inter001.brianmthembu.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        service.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @Operation(summary = "Authenticate a user and return a JWT token")
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request));
    }
}