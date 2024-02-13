package com.kafka.demo;

import java.util.HashMap;
import java.util.Map;

// "static void main" must be defined in a public class.
public class Main {
    public static void main(String[] args) {
        Employee e1 = new Employee(1,"A");
        Employee e2 = new Employee(1,"A");
       // Integer i = new Integer(1);
        Map<Employee,Integer> map = new HashMap<>();
        map.put(e1,1);
        map.put(e2,2);
        System.out.println(map);
    }
}

class Employee{
    private int id;
    private String name;

    public Employee(int id,String name){
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object e1){
        Employee e = (Employee)e1;
        return e.id == id;
    }

    @Override
    public int hashCode(){
        return id+name.hashCode();
    }
}