package com.luv2code.aopdemo.dao;

import com.luv2code.aopdemo.model.Account;
import lombok.Data;
import org.springframework.stereotype.Repository;

@Repository
public class AccountDAOImpl implements AccountDAO{

    private String name;

    @Override
    public void addAccount(Account account, boolean VIPFlag) {
        System.out.println(getClass()+" Doing my account DB     : adding an account\n");
    }

    @Override
    public boolean doWork() {
        System.out.println(getClass()+" Doing work\n");
        return false;
    }

    @Override
    public String getName() {
        System.out.println("In Name Getter method");
        return name;
    }

    @Override
    public void setName(String name) {
        System.out.println("In Name Setter method");
        this.name = name;
    }
}
