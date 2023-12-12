package com.luv2code.springcoredemo.common;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class SoccerCoach implements Coach{

    @Override
    public String getDailyWorkout() {
        return "Soccer for 15 minutes!!!!";
    }

}
