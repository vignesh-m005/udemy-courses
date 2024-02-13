package com.luv2code.cruddemo.service;

import com.luv2code.cruddemo.dao.EmployeeDAO;
import com.luv2code.cruddemo.model.EmployeeEntity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    EmployeeDAO employeeDAO;

    @Override
    public List<EmployeeEntity> findAll() {
        return employeeDAO.findAll();
    }

    @Override
    public EmployeeEntity findById(int id) {
        return employeeDAO.findById(id);
    }

    @Override
    @Transactional
    public EmployeeEntity save(EmployeeEntity employeeEntity) {
        return employeeDAO.save(employeeEntity);
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        EmployeeEntity employeeEntity = employeeDAO.findById(id);
        employeeDAO.deleteById(employeeEntity);
    }
}
