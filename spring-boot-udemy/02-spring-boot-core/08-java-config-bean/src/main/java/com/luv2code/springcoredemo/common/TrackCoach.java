package com.luv2code.springcoredemo.common;

public class TrackCoach implements Coach{

    public TrackCoach(){
        System.out.println("In constructor TrackCoach");
    }

    @Override
    public String getDailyWorkout() {
        return "Race for 15 minutes";
    }
}
