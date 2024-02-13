package com.luv2code.cruddemo.dao;

import com.luv2code.cruddemo.entity.StudentEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDAOImpl implements StudentDAO{
    //Field Injection
//    @Autowired
//    EntityManager entityManager;

    //Constructor injection
    private EntityManager entityManager;
    public StudentDAOImpl(EntityManager entityManager){
        this.entityManager=entityManager;
    }

    @Override
    @Transactional
    public void save(StudentEntity studentEntity) {
        entityManager.persist(studentEntity);
    }

    @Override
    public StudentEntity findById(int id) {
        return entityManager.find(StudentEntity.class,id);
    }

    @Override
    public List<StudentEntity> findAll() {
        //create query
        TypedQuery<StudentEntity> query = entityManager.createQuery("From StudentEntity order by firstName",StudentEntity.class);

        //return query results
        return query.getResultList();
    }

    @Override
    public List<StudentEntity> findByLastName(String lastName) {
        //create query
        TypedQuery<StudentEntity> query = entityManager.createQuery("From StudentEntity where lastName=:lastName",StudentEntity.class);

        //set parameter
        query.setParameter("lastName",lastName);

        //return values
        return query.getResultList();
    }

    @Override
    @Transactional
    public void update(StudentEntity studentEntity) {
        entityManager.merge(studentEntity);
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        //retrieve
        StudentEntity studentEntity=entityManager.find(StudentEntity.class,id);

        //delete
        entityManager.remove(studentEntity);
    }

    @Override
    @Transactional
    public int deleteAll() {
        return entityManager.createQuery("delete from StudentEntity").executeUpdate();
    }
}
