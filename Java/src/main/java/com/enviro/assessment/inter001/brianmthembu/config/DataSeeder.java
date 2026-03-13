package com.enviro.assessment.inter001.brianmthembu.config;

import com.enviro.assessment.inter001.brianmthembu.model.*;
import com.enviro.assessment.inter001.brianmthembu.repository.PickupRequestRepository;
import com.enviro.assessment.inter001.brianmthembu.repository.RecyclingBinRepository;
import com.enviro.assessment.inter001.brianmthembu.repository.UserRepository;
import com.enviro.assessment.inter001.brianmthembu.repository.WasteRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final WasteRecordRepository wasteRepository;
    private final RecyclingBinRepository binRepository;
    private final PickupRequestRepository pickupRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("kattegat");
            admin.setPassword(passwordEncoder.encode("helloWorld"));
            admin.setRole("ROLE_ADMIN");

            User normalUser = new User();
            normalUser.setUsername("lindt");
            normalUser.setPassword(passwordEncoder.encode("helloToo"));
            normalUser.setRole("ROLE_USER");

            userRepository.saveAll(Arrays.asList(admin, normalUser));
        }

        if (wasteRepository.count() == 0) {
            WasteRecord w1 = new WasteRecord(null, "Plastic", 5.0, LocalDate.now().minusDays(1));
            WasteRecord w2 = new WasteRecord(null, "Glass", 3.2, LocalDate.now());
            WasteRecord w3 = new WasteRecord(null, "Metal", 4.0, LocalDate.now());

            wasteRepository.saveAll(Arrays.asList(w1, w2, w3));
        }

        if (binRepository.count() == 0) {
            RecyclingBin b1 = new RecyclingBin(null, "Rosebank Mall", "50 Bath Ave, Rosebank", -26.146, 28.042, "Plastic, Glass, Metal");
            RecyclingBin b2 = new RecyclingBin(null, "Sandton City", "83 Rivonia Rd, Sandton", -26.107, 28.056, "Plastic, Paper");
            RecyclingBin b3 = new RecyclingBin(null, "Melrose Arch", "1 Melrose Blvd, Birnam", -26.132, 28.068, "Glass, Metal");

            binRepository.saveAll(Arrays.asList(b1, b2, b3));
        }

        if (pickupRepository.count() == 0) {
            PickupRequest p1 = new PickupRequest(null, "Plastic", LocalDate.now().plusDays(1), "123 Main St", "Leave at gate", PickupStatus.PENDING);
            PickupRequest p2 = new PickupRequest(null, "Glass", LocalDate.now().plusDays(2), "456 Park Ave", "Call before arrival", PickupStatus.SCHEDULED);
            PickupRequest p3 = new PickupRequest(null, "Metal", LocalDate.now().plusDays(3), "789 Oak Rd", "Ring bell", PickupStatus.COMPLETED);

            pickupRepository.saveAll(Arrays.asList(p1, p2, p3));
        }

        System.out.println("Data seeding complete.");
    }
}