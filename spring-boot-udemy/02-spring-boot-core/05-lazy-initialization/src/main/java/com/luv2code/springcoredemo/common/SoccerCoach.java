package com.luv2code.springcoredemo.common;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
@Lazy
public class SoccerCoach implements Coach{

    public SoccerCoach(){
        System.out.println("SoccerCoach constructor");
    }

    @Override
    public String getDailyWorkout() {
        return "Soccer for 15 minutes!!!!";
    }

}
