package com.luv2code.springcoredemo.common;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
// @Qualifier has higher priority
public class CricketCoach implements Coach{

    @Override
    public String getDailyWorkout() {
        return "Cricket for 15 minutes!!!!";
    }

}
