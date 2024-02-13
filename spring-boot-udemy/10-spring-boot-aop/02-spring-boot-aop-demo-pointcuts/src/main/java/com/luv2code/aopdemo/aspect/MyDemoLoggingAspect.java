package com.luv2code.aopdemo.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MyDemoLoggingAspect {

    @Pointcut("execution(* com.luv2code.aopdemo.dao.*.*(..))")
    private void forDAOPackage(){}

    @Pointcut("execution(* com.luv2code.aopdemo.dao.*.get*(..))")
    private void getter(){}

    @Pointcut("execution(* com.luv2code.aopdemo.dao.*.set*(..))")
    private void setter(){}

    @Pointcut("forDAOPackage() && !(getter() || setter())")
    private void forDAOPackageExcludeGetterAndSetter(){}



    @Before("forDAOPackageExcludeGetterAndSetter()")
    public void beforeAddAccountAdvice(){
        System.out.println("\n ============> Executing @Before advice on addAccount()");
    }

    @Before("forDAOPackageExcludeGetterAndSetter()")
    public void performAPIAnalytics(){
        System.out.println("\n ============> Performing API analytics");
    }
}
