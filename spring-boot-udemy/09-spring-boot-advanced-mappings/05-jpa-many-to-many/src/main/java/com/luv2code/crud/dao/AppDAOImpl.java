package com.luv2code.crud.dao;

import com.luv2code.crud.entity.Course;
import com.luv2code.crud.entity.Instructor;
import com.luv2code.crud.entity.InstructorDetail;
import com.luv2code.crud.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AppDAOImpl implements AppDAO{

    @Autowired
    EntityManager entityManager;

    @Override
    @Transactional
    public void save(Instructor instructor) {
        entityManager.persist(instructor);
    }

    @Override
    public Instructor findByInstructorId(int id) {
        return entityManager.find(Instructor.class, id);
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        Instructor instructor = findByInstructorId(id);

        entityManager.remove(instructor);
    }

    @Override
    public InstructorDetail findInstructorDetailById(int id) {
        return entityManager.find(InstructorDetail.class,id);
    }

    @Override
    @Transactional
    public void deleteInstructorDetailById(int id) {
        InstructorDetail instructorDetail = findInstructorDetailById(id);

        //break bi-directional link
        instructorDetail.getInstructor().setInstructorDetail(null);

        entityManager.remove(instructorDetail);
    }

    @Override
    public List<Course> findCoursesForInstructor(int id) {
        TypedQuery<Course> query = entityManager.createQuery("from Course where instructor.id = :id",Course.class);
        query.setParameter("id",id);
        return query.getResultList();
    }

    @Override
    public Instructor findInstructorUsingJoinFetch(int id) {
        TypedQuery<Instructor> query = entityManager.createQuery(
                "select i from Instructor i " +
                        "join fetch i.courses " +
                        "where i.id = :id"
                , Instructor.class
        );
        query.setParameter("id",id);
        return query.getSingleResult();
    }

    @Override
    @Transactional
    public void updateInstructor(Instructor instructor) {
        entityManager.merge(instructor);
    }

    @Override
    @Transactional
    public void updateCourse(Course course) {
        entityManager.merge(course);
    }

    @Override
    public Course findCourseById(int id) {
        return entityManager.find(Course.class,id);
    }

    @Override
    @Transactional
    public void deleteInstructorById(int id) {
        Instructor instructor = entityManager.find(Instructor.class,id);

        List<Course> courses = instructor.getCourses();
        for(Course course:courses) course.setInstructor(null);

        entityManager.remove(instructor);
    }

    @Override
    @Transactional
    public void deleteCourseById(int id) {
        Course course = entityManager.find(Course.class,id);
        entityManager.remove(course);
    }

    @Override
    @Transactional
    public void saveCourse(Course course) {
        entityManager.persist(course);
    }

    @Override
    public Course findCourseAndReviews(int courseId) {
        TypedQuery<Course> query = entityManager.createQuery(
                "select c from Course c " +
                        "join fetch c.reviews " +
                        "where c.id = :id",
                Course.class
        );
        query.setParameter("id",courseId);
        return query.getSingleResult();
    }

    @Override
    public Course findCourseAndStudentByCourseId(int courseId) {
        TypedQuery<Course> query =entityManager.createQuery(
                "select c from Course c " +
                        "join fetch c.students " +
                        "where c.id = :id",
                Course.class
        );
        query.setParameter("id",courseId);
        return query.getSingleResult();
    }

    @Override
    public Student findCourseAndStudentByStudentId(int id) {
        TypedQuery<Student> query =entityManager.createQuery(
                "select s from Student s " +
                        "join fetch s.courses " +
                        "where s.id = :id",
                Student.class
        );
        query.setParameter("id",id);
        return query.getSingleResult();
    }

    @Override
    @Transactional
    public void update(Student student) {
        entityManager.merge(student);
    }

    @Override
    @Transactional
    public void deleteStudentById(int id) {
        Student student = entityManager.find(Student.class,id);
        entityManager.remove(student);
    }
}
