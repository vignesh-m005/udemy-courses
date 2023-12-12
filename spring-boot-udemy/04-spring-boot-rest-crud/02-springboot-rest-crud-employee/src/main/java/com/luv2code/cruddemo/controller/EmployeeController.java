package com.luv2code.cruddemo.controller;

import com.luv2code.cruddemo.dao.EmployeeDAO;
import com.luv2code.cruddemo.model.EmployeeEntity;
import com.luv2code.cruddemo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/employees")
    public List<EmployeeEntity> getAllEmployees(){
        return employeeService.findAll();
    }

    @GetMapping("/employee/{employeeId}")
    public EmployeeEntity getEmployeeById(@PathVariable int employeeId){
        EmployeeEntity employeeEntity = employeeService.findById(employeeId);
        if (employeeEntity == null){
            throw new RuntimeException("EmployeeId Not Valid");
        }
        return employeeEntity;
    }

    @PostMapping("/employee/create")
    public EmployeeEntity createEmployee(@RequestBody EmployeeEntity employeeEntity){
        employeeEntity.setId(0);
        return employeeService.save(employeeEntity);
    }

    @PutMapping("/employee/update")
    public EmployeeEntity update(@RequestBody EmployeeEntity employeeEntity){
        return employeeService.save(employeeEntity);
    }

    @DeleteMapping("/employee/delete/{employeeId}")
    public String deleteById(@PathVariable int employeeId){
        employeeService.deleteById(employeeId);
        return "Deleted Successfully";
    }
}
