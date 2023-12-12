package com.luv2code.aopdemo.dao;

import org.springframework.stereotype.Repository;

@Repository
public class MembershipDAOImpl implements MembershipDAO{

    @Override
    public boolean addAccount() {
        System.out.println(getClass()+" Doing my MemberShip DB work: adding an account\n");
        return true;
    }

    @Override
    public void goToSleep() {
        System.out.println(getClass()+" I am going to sleep now\n");
    }

}
