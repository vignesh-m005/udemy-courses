package com.luv2code.springcoredemo.common;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Component;

@Component
public class SoccerCoach implements Coach{

    @Override
    public String getDailyWorkout() {
        return "Soccer for 15 minutes!!!!";
    }

    //define our init method
    @PostConstruct
    public void doStartUpStuff(){
        System.out.println("In doStartUpStuff() "+getClass().getSimpleName());
    }

    //define our destroy method
    @PreDestroy
    public void doCleanUpStuff(){
        System.out.println("In doCleanUpStuff() "+getClass().getSimpleName());
    }
}
