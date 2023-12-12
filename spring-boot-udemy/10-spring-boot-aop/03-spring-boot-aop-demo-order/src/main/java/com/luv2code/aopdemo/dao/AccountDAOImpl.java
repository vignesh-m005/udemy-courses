package com.luv2code.aopdemo.dao;

import com.luv2code.aopdemo.model.Account;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AccountDAOImpl implements AccountDAO{

    private String name;

    @Override
    public List<Account> findAccounts() {
       return findAccounts(false);
    }

    @Override
    public List<Account> findAccounts(boolean tripWire) {
        System.out.println("findAccounts Executing");
        if(tripWire){
            throw new RuntimeException("No Accounts will be created");
        }

        List<Account> myAccounts = new ArrayList<>();
        Account account = Account.builder()
                .name("Kamal")
                .level("Gold")
                .build();
        Account account1 = Account.builder()
                .name("Ram")
                .level("Platinum")
                .build();
        Account account2 = Account.builder()
                .name("Vignesh")
                .level("Silver")
                .build();
        myAccounts.add(account);
        myAccounts.add(account1);
        myAccounts.add(account2);

        return myAccounts;
    }

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
        System.out.println("In Name Getter method\n");
        return name;
    }

    @Override
    public void setName(String name) {
        System.out.println("In Name Setter method\n");
        this.name = name;
    }
}
