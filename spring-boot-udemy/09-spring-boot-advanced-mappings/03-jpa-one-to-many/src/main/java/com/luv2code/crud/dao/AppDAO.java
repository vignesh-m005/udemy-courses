package com.luv2code.crud.dao;

import com.luv2code.crud.entity.Course;
import com.luv2code.crud.entity.Instructor;
import com.luv2code.crud.entity.InstructorDetail;

import java.util.List;

public interface AppDAO {

    void save(Instructor instructor);

    Instructor findByInstructorId(int id);

    void deleteById(int id);

    InstructorDetail findInstructorDetailById(int id);

    void deleteInstructorDetailById(int id);

    List<Course> findCoursesForInstructor(int id);

    Instructor findInstructorUsingJoinFetch(int id);

    void updateInstructor(Instructor instructor);

    void updateCourse(Course course);

    Course findCourseById(int id);

    void deleteInstructorById(int id);

    void deleteCourseById(int id);
}
