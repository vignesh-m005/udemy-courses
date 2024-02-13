package com.luv2code.aopdemo.aspect;

import com.luv2code.aopdemo.model.Account;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Aspect
@Component
@Order(2)
public class MyDemoLoggingAspect {

    @Before("com.luv2code.aopdemo.aspect.AOPExpressions.forDAOPackageExcludeGetterAndSetter()")
    public void beforeAddAccountAdvice(JoinPoint joinPoint){
        System.out.println(" ============> Executing @Before advice on addAccount()");

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        System.out.println("Method: "+methodSignature);

        Object[] args = joinPoint.getArgs();

        for(Object obj: args){
            System.out.println(obj);

            if(obj instanceof Account account){
                System.out.println("Account Name: "+account.getName());
                System.out.println("Account Level: "+account.getLevel());
            }
        }
    }

    @AfterReturning(
            pointcut = "execution(* com.luv2code.aopdemo.dao.AccountDAO.findAccounts(..))",
            returning = "result"
    )
    public void afterReturningFindAccounts(JoinPoint joinPoint, List<Account> result){
        String method = joinPoint.getSignature().toShortString();
        System.out.println("===============> Executing AfterReturning on method: "+method);
        System.out.println("Result: "+result);



        //Post - process
        convertAccountNameToUpperCase(result);
    }

    private void convertAccountNameToUpperCase(List<Account> result) {
        result.forEach(account -> {account.setName(account.getName().toUpperCase());});

//        for (Account account: result){
//            String name = account.getName().toUpperCase();
//            account.setName(name);
//        }
    }


    @AfterThrowing(
            pointcut = "execution(* com.luv2code.aopdemo.dao.AccountDAO.findAccounts(..))",
            throwing = "exception"
    )
    public void afterThrowingFindAccounts(JoinPoint joinPoint, Throwable exception){
        String method = joinPoint.getSignature().toShortString();
        System.out.println("===============> Executing AfterThrowing on method: "+method);
        System.out.println("The Exception: "+exception);
    }

    @After( "execution(* com.luv2code.aopdemo.dao.AccountDAO.findAccounts(..))")
    public void afterFinallyFindAccounts(JoinPoint joinPoint){
        String method = joinPoint.getSignature().toShortString();
        System.out.println("===============> Executing AfterFinally on method: "+method);
        //Will run both on success or failure
        //Can't access Throwable in case of exception
    }


    @Around("execution(* com.luv2code.aopdemo.service.TrafficFortuneService.getFortune(..))")
    public Object aroundGetFortune(ProceedingJoinPoint joinPoint) throws Throwable{

        String method = joinPoint.getSignature().toShortString();
        System.out.println("===============> Executing @Around on method: "+method);

        long startTime = System.currentTimeMillis();

        Object result = null;
        try {
            result = joinPoint.proceed();
        }catch (Exception e){
            System.out.println(e.getMessage());
            System.out.println("Exception handled");
            //result = "Traffic is handled!!!!";

            throw e;
        }
        long endTime = System.currentTimeMillis();

        long duration = endTime - startTime;

        System.out.println("Time taken to complete For getFortune method: "+ duration +" ms");

        return result;
    }
}
