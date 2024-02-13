package com.luv2code.aopdemo.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MyDemoLoggingAspect {

    //@Before("execution(public void updateAccount())")
    //@Before("execution(public void add*())")              To match on any class method starts with add
    //@Before("execution(public void addAccount())")        To all addAccount method in any class
    //@Before("execution(public void com.luv2code.aopdemo.dao.AccountDAO.addAccount())") To match only in AccountDAO class
    //@Before("execution(void add*())")                     Access-modifier is optional, Matches all methods with return type void and starts with add
    //@Before("execution(* add*())")                        //Matches with any return type
    //@Before("execution(* add*(com.luv2code.aopdemo.model.Account))")   //Matches with parameter type Account
    //@Before("execution(* add*(com.luv2code.aopdemo.model.Account,..))")   //Matches parameter Account,any
    //@Before("execution(* add*(..))")                     //Matches with any number of parameters
    @Before("execution(* com.luv2code.aopdemo.dao.*.*(..))")                     //Matches in all methods in a package
    public void beforeAddAccountAdvice(){
        System.out.println("\n ============> Executing @Before advice on addAccount()");
    }
}
