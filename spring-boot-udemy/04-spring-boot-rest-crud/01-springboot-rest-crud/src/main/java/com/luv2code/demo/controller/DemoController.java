package com.luv2code.demo.controller;

import com.luv2code.demo.exceptions.StudentNotFoundException;
import com.luv2code.demo.model.Student;
import com.luv2code.demo.model.StudentErrorResponse;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/test")
public class DemoController {

    private List<Student> list;

    @GetMapping("/hello")
    public String hello(){
        return "Hello World";
    }

    @PostConstruct
    public void buildStudents(){
        list = new ArrayList<>();
        list.add(new Student("AAA","ZZZ"));
        list.add(new Student("BBB","YYY"));
        list.add(new Student("CCC","XXX"));
    }

    @GetMapping("/students")
    public List<Student> getStudents(){
        return list;
    }

    @GetMapping("/student/{studentId}")
    public Student getStudent(@PathVariable int studentId){
        if(studentId >= list.size()){
            throw new StudentNotFoundException("Student Not Found for studentId "+studentId);
        }
        return list.get(studentId);
    }


}
