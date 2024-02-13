package com.luv2code.aopdemo.dao;

import com.luv2code.aopdemo.model.Account;
import org.springframework.stereotype.Repository;

@Repository
public class AccountDAOImpl implements AccountDAO{


    @Override
    public void addAccount(Account account, boolean VIPFlag) {
        System.out.println(getClass()+" Doing my account DB     : adding an account\n");
    }

    @Override
    public boolean doWork() {
        System.out.println(getClass()+" Doing work\n");
        return false;
    }
}
