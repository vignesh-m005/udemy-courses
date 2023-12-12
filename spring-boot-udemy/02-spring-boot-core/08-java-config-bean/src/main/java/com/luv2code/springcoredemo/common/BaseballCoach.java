package com.luv2code.springcoredemo.common;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
public class BaseballCoach implements Coach{

    @Override
    public String getDailyWorkout() {
        return "Base ball for 15 minutes!!!!";
    }

}
