package com.mycoolapp.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {

    @GetMapping("/")
    public String test(){
        return "SUCCESS";
    }

    @GetMapping("/test/{temp}")
    public int test(@PathVariable("temp") int temp) throws InterruptedException {
        if(temp == 2)
            Thread.sleep(5000);
        return temp;
    }
}
