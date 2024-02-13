package com.luv2code.crud.dao;

import com.luv2code.crud.entity.Instructor;
import com.luv2code.crud.entity.InstructorDetail;

public interface AppDAO {

    void save(Instructor instructor);

    Instructor findByInstructorId(int id);

    void deleteById(int id);

    InstructorDetail findInstructorDetailById(int id);

    void deleteInstructorDetailById(int id);
}
