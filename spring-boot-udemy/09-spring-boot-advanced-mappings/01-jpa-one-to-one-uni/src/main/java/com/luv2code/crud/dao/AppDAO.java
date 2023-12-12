package com.luv2code.crud.dao;

import com.luv2code.crud.entity.Instructor;

public interface AppDAO {

    void save(Instructor instructor);

    Instructor findByInstructorId(int id);

    void deleteById(int id);

}
