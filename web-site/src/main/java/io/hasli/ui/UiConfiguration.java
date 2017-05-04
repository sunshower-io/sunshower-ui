package io.hasli.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by haswell on 5/4/17.
 */
@EnableAutoConfiguration
@SpringBootApplication
public class UiConfiguration {

    public static void main(String[] args) {
        SpringApplication.run(UiConfiguration.class, args);
    }
}
