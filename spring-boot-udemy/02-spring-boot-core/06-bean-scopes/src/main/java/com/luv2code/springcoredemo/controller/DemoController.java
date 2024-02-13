package com.luv2code.springcoredemo.controller;

import com.luv2code.springcoredemo.common.Coach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @Autowired
    @Qualifier("soccerCoach") Coach coach;

    @Autowired
    @Qualifier("soccerCoach") Coach secondCoach;


    @GetMapping("/")
    public String getDailyWorkout(){

        return "Comparing beans: coach==secondCoach, "+ (coach==secondCoach);
        //For singleton true
        //For prototype false
    }
}
