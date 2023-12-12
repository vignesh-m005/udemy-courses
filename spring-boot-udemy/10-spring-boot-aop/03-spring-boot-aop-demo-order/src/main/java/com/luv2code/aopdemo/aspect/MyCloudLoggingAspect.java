package com.luv2code.aopdemo.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(1)
public class MyCloudLoggingAspect {

    @Before("com.luv2code.aopdemo.aspect.AOPExpressions.forDAOPackageExcludeGetterAndSetter()")
    public void cloudLog(){
        System.out.println(" ============> Logging to cloud async");
    }

}
