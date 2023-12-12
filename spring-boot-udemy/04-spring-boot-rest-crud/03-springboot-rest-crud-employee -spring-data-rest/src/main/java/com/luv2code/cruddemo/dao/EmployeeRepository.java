package com.luv2code.cruddemo.dao;

import com.luv2code.cruddemo.model.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
//@RepositoryRestResource(path = "members")
public interface EmployeeRepository extends JpaRepository<EmployeeEntity,Integer> {
}
//case sensitive
//http://localhost:8080/employeeEntities GET method

//http://localhost:8080/magic-api/employeeEntities with base path
//http://localhost:8080/employeeEntities?sort=id,desc