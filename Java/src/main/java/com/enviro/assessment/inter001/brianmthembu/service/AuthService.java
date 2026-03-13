package com.enviro.assessment.inter001.brianmthembu.service;

import com.enviro.assessment.inter001.brianmthembu.dto.LoginRequest;
import com.enviro.assessment.inter001.brianmthembu.dto.RegisterRequest;
import com.enviro.assessment.inter001.brianmthembu.model.User;
import com.enviro.assessment.inter001.brianmthembu.repository.UserRepository;
import com.enviro.assessment.inter001.brianmthembu.security.JwtService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent())
            throw new EntityExistsException("Username already exists");

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);
    }

    public Map<String, String> login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new BadCredentialsException("Invalid credentials");

        Map<String, String> response = new HashMap<>();
        response.put("token", jwtService.generateToken(user.getUsername()));

        return response;
    }
}