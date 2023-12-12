package com.luv2code.springcoredemo.controller;

import com.luv2code.util.Coach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    //define private field for the dependency
    private Coach myCoach;

    //define a constructor for dependency injection
    @Autowired
    public DemoController(Coach coach){
        myCoach = coach;
    }

    @GetMapping("/")
    public String getDailyWorkout(){
        return myCoach.getDailyWorkout();
    }
}
