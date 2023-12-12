package com.luv2code.cruddemo.dao;

import com.luv2code.cruddemo.model.EmployeeEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface EmployeeDAO {

    List<EmployeeEntity> findAll();

    EmployeeEntity findById(int id);

    EmployeeEntity save(EmployeeEntity employeeEntity);

    void deleteById(EmployeeEntity employeeEntity);
}
