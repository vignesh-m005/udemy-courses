package com.luv2code.aopdemo.aspect;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class TestController {

    @GetMapping("/test/{temp}")
    public int test(@PathVariable("temp") int temp) throws InterruptedException {
        if(temp == 2)
            Thread.sleep(5000);
        return temp;
    }
}
