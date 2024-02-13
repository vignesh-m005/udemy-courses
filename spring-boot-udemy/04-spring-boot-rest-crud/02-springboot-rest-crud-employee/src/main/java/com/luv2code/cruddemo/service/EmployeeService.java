package com.luv2code.cruddemo.service;

import com.luv2code.cruddemo.model.EmployeeEntity;

import java.util.List;

public interface EmployeeService {

    List<EmployeeEntity> findAll();

    EmployeeEntity findById(int id);

    EmployeeEntity save(EmployeeEntity employeeEntity);

    void deleteById(int id);
}
