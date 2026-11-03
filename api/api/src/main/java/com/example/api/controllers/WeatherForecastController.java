package com.example.api.controllers;

import com.example.api.WeatherForecast;
import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.IntStream;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/weatherforecast")
public class WeatherForecastController {

    private static final String[] SUMMARIES = {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    @GetMapping
    public List<WeatherForecast> get() {
        ThreadLocalRandom random = ThreadLocalRandom.current();
        return IntStream.rangeClosed(1, 5)
                .mapToObj(index -> new WeatherForecast(
                        LocalDate.now().plusDays(index),
                        random.nextInt(-20, 55),
                        SUMMARIES[random.nextInt(SUMMARIES.length)]))
                .toList();
    }
}
