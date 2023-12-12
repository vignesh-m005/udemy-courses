package com.luv2code.aopdemo.dao;

import com.luv2code.aopdemo.model.Account;

import java.util.List;

public interface AccountDAO {

    List<Account> findAccounts();

    List<Account> findAccounts(boolean tripWire);

    void addAccount(Account account, boolean VIPFlag);

    boolean doWork();

    public String getName();

    public void setName(String name);
}
