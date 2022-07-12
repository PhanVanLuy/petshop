package com.luyphan.petshop;

import org.jetbrains.annotations.NotNull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableCaching
@EnableWebMvc
@CrossOrigin
@EnableAsync
@SpringBootApplication
public class PetShopApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(PetShopApplication.class, args);
	}

	@Override
	public void addCorsMappings(@NotNull CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:4200")
				.allowedMethods("PUT", "DELETE", "GET", "POST");
		;
	}
}
