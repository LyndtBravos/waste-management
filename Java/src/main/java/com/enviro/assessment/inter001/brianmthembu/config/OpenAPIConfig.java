package com.enviro.assessment.inter001.brianmthembu.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI enviro365OpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Enviro365 Waste Management API")
                        .description("REST API for managing waste tracking, recycling bins, and pickup scheduling.")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Brian Mthembu")
                                .email("lindtbravos@gmail.com")));
    }
}