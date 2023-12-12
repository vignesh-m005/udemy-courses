package com.luv2code.aopdemo.dao;

import com.luv2code.aopdemo.model.Account;

public interface AccountDAO {

    void addAccount(Account account, boolean VIPFlag);

    boolean doWork();
}
