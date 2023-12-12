package com.luv2code.crud.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@ToString
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.REFRESH}
            ,fetch = FetchType.LAZY
    )
    @JoinTable(
            name = "course_student",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    @ToString.Exclude
    private List<Course> courses;

    public Student(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public void addCourse(Course course){
        if (courses == null) courses = new ArrayList<>();
        courses.add(course);
    }
}
