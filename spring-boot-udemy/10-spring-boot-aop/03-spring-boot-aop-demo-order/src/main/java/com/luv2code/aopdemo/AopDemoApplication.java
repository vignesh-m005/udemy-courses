package com.luv2code.aopdemo;

import com.luv2code.aopdemo.dao.AccountDAO;
import com.luv2code.aopdemo.dao.AccountDAOImpl;
import com.luv2code.aopdemo.dao.MembershipDAO;
import com.luv2code.aopdemo.model.Account;
import com.luv2code.aopdemo.service.TrafficFortuneService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class AopDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(AopDemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(AccountDAO accountDAO, MembershipDAO membershipDAO, TrafficFortuneService trafficFortuneService){
		return runner -> {

			//demoTheBeforeAdvice(accountDAO, membershipDAO);
			//demoTheAfterReturningAdvice(accountDAO);
			//demoTheAfterThrowingAdvice(accountDAO);
			//demoTheAfterAdvice(accountDAO);
			//demoTheAroundAdvice(trafficFortuneService);
			//demoTheAroundAdviceHandleException(trafficFortuneService);
			demoTheAroundAdviceThrowException(trafficFortuneService);

		};
	}

	private void demoTheAroundAdviceThrowException(TrafficFortuneService trafficFortuneService) {
		System.out.println("Main program demoTheAroundAdviceThrowException");
		System.out.println("Calling Fortune method");

		boolean tripWire = true;

		String data = trafficFortuneService.getFortune(tripWire);
		System.out.println("Fortune: "+data);
	}

	private void demoTheAroundAdviceHandleException(TrafficFortuneService trafficFortuneService) {
		System.out.println("Main program demoTheAroundAdviceHandleException");
		System.out.println("Calling Fortune method");

		boolean tripWire = true;

		String data = trafficFortuneService.getFortune(tripWire);
		System.out.println("Fortune: "+data);
	}

	private void demoTheAroundAdvice(TrafficFortuneService trafficFortuneService) {
		System.out.println("Main program demoTheAroundAdvice");
		System.out.println("Calling Fortune method");
		String data = trafficFortuneService.getFortune();
		System.out.println("Fortune: "+data);
	}

	private void demoTheAfterAdvice(AccountDAO accountDAO) {
		List<Account> accounts = null;
		try{
			boolean tripWire = false;
			//tripWire = true;
			accounts=accountDAO.findAccounts(tripWire);
		}catch (Exception e){
			System.out.println("demoTheAfterAdvice Method Exception: "+e);
		}

		System.out.println("Accounts: "+accounts+"\n");
	}

	private void demoTheAfterThrowingAdvice(AccountDAO accountDAO) {
		List<Account> accounts = null;
		try{
			boolean tripWire =true;
			accounts=accountDAO.findAccounts(tripWire);
		}catch (Exception e){
			System.out.println("demoTheAfterThrowingAdvice Method Exception: "+e);
		}

		System.out.println("Accounts: "+accounts+"\n");
	}

	private void demoTheAfterReturningAdvice(AccountDAO accountDAO) {
		List<Account> accounts = accountDAO.findAccounts();
		System.out.println("demoTheAfterReturningAdvice Method");
		System.out.println("Accounts: "+accounts+"\n");
	}

	private void demoTheBeforeAdvice(AccountDAO accountDAO, MembershipDAO membershipDAO) {
		accountDAO.addAccount(new Account("Vignesh","Platinum"),true);
		accountDAO.doWork();
		membershipDAO.goToSleep();
		membershipDAO.addAccount();

		accountDAO.setName("NAME");
		System.out.println(accountDAO.getName());
	}

}
