package com.luv2code.springcoredemo.models;

import org.springframework.stereotype.Component;

@Component
public class SoccerCoach implements Coach{

    @Override
    public String getDailyWorkout() {
        return "Practice for 20 minutes soccer";
    }
}
