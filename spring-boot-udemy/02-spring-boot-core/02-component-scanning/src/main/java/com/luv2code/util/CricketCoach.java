package com.luv2code.util;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class CricketCoach implements Coach{

    @Override
    public String getDailyWorkout() {
        return "Bowling for 15 minutes!!!!";
    }

}
