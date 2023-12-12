package com.luv2code.springboot.cruddemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public InMemoryUserDetailsManager userDetailsManager(){

        UserDetails john = User.builder()
                .username("john")
                .password("{noop}John@123") //noop -> no operation (plain string)
                .roles("EMPLOYEE")
                .build();

        UserDetails mary = User.builder()
                .username("mary")
                .password("Mary@123")
                .roles("EMPLOYEE","MANAGER")
                .build();

        UserDetails susan = User.builder()
                .username("susan")
                .password("Susan@123")
                .roles("EMPLOYEE","MANAGER","ADMIN")
                .build();

        return new InMemoryUserDetailsManager(john,mary,susan);
    }

    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(configurer ->
                configurer
                        .requestMatchers(HttpMethod.GET,"/api/employees/**").hasRole("EMPLOYEE")
                        //.requestMatchers(HttpMethod.GET,"/api/employees/**").hasRole("EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT,"/api/employees").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.POST,"/api/employees/**").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.DELETE,"/api/employees/**").hasRole("ADMIN")
        );

        //Use HTTP basic authentication
        http.httpBasic(Customizer.withDefaults());

        //Disable Cross Site Request Forgery (CSRF)
        //In general not required to use for stateless REST APIs(POST,GET,PUT,DELETE and/or PATCH)
        http.csrf(csrf->csrf.disable());

        return http.build();
    }
}
