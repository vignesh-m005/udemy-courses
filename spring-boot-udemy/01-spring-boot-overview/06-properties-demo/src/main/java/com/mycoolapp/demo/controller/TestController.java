package com.mycoolapp.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {

    @Value("${coach.name}")
    private String coachName;

    @Value("${team.name}")
    private String teamName;

    @GetMapping("/")
    public String test(){
        return "SUCCESS";
    }

    //inject properties name for coach.nam & team.name

    @GetMapping("team")
    public String getCoachAndTeamName(){
        //coachName = "Tom";
        return "Coach :"+coachName+" Team: "+teamName;
    }

}
