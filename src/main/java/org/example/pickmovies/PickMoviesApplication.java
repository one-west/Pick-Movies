package org.example.pickmovies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class PickMoviesApplication {

	public static void main(String[] args) {
		SpringApplication.run(PickMoviesApplication.class, args);
	}
}
