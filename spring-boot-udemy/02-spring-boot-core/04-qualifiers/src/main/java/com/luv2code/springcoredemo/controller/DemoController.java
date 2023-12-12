package com.luv2code.springcoredemo.controller;

import com.luv2code.springcoredemo.common.Coach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    private final Coach myCoach;

    @Autowired
    public DemoController(@Qualifier("swimCoach") Coach coach){
        myCoach = coach;
    }
    // @Qualifier has higher priority than @Primary
    @Autowired
    @Qualifier("soccerCoach") Coach coach;

    @GetMapping("/field")
    public String test(){
        return coach.getDailyWorkout();
    }

    @GetMapping("/")
    public String getDailyWorkout(){
        return myCoach.getDailyWorkout();
    }
}
