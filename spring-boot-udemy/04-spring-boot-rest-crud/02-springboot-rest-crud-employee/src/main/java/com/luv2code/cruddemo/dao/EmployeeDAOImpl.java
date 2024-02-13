package com.luv2code.cruddemo.dao;

import com.luv2code.cruddemo.model.EmployeeEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeDAOImpl implements EmployeeDAO{

    @Autowired
    EntityManager entityManager;

    @Override
    public List<EmployeeEntity> findAll() {

        TypedQuery<EmployeeEntity> typedQuery = entityManager.createQuery("FROM EmployeeEntity", EmployeeEntity.class);
        return typedQuery.getResultList();
    }

    @Override
    public EmployeeEntity findById(int id) {
        TypedQuery<EmployeeEntity> typedQuery = entityManager.createQuery("FROM EmployeeEntity where id = :id", EmployeeEntity.class);
        typedQuery.setParameter("id",id);

        //return typedQuery.getSingleResult();
        return entityManager.find(EmployeeEntity.class,id);
    }

    @Override
    public EmployeeEntity save(EmployeeEntity employeeEntity) {
        return entityManager.merge(employeeEntity);
    }

    @Override
    public void deleteById(EmployeeEntity employeeEntity) {
        entityManager.remove(employeeEntity);
    }
}
