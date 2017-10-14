package io.sunshower.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by haswell on 6/26/17.
 */
@SpringBootApplication
@EnableAutoConfiguration
public class SunshowerUiConfiguration {

    public static void main(String[] args) {
        SpringApplication.run(SunshowerUiConfiguration.class, args);
    }
}
