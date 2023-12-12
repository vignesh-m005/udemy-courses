package com.luv2code.crud.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "instructor")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class Instructor {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    // set up mapping to InstructorDetail entity
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "instructor_detail_id")
    private InstructorDetail instructorDetail;

    @OneToMany(mappedBy = "instructor",
              cascade = {CascadeType.PERSIST,CascadeType.DETACH,
                         CascadeType.MERGE,CascadeType.REFRESH}
                , fetch = FetchType.LAZY)
    private List<Course> courses;

    public Instructor(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public void add(Course course){
        if(courses==null) courses = new ArrayList<>();
        courses.add(course);
        course.setInstructor(this);
    }
}
