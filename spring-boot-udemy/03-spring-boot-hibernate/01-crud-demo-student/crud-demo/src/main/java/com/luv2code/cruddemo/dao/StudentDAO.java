package com.luv2code.cruddemo.dao;

import com.luv2code.cruddemo.entity.StudentEntity;

import java.util.List;

public interface StudentDAO {

    void save(StudentEntity studentEntity);

    StudentEntity findById(int id);

    List<StudentEntity> findAll();

    List<StudentEntity> findByLastName(String lastName);

    void update(StudentEntity studentEntity);

    void deleteById(int id);

    int deleteAll();
}
