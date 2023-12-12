package com.luv2code.springcoredemo.common;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
public class SwimCoach implements Coach{

    public SwimCoach(){
        System.out.println("SwimCoach constructor");
    }

    @Override
    public String getDailyWorkout() {
        return "Swim for 15 minutes!!!!";
    }

}
