package com.luv2code.springcoredemo.common;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class SwimCoach implements Coach{

    @Override
    public String getDailyWorkout() {
        return "Swim for 15 minutes!!!!";
    }

}
