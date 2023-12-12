package com.luv2code.crud.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "course")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@ToString
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @ToString.Exclude
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.DETACH,
                          CascadeType.MERGE,CascadeType.REFRESH}
            //,fetch = FetchType.LAZY
    )
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id")
    private List<Review> reviews;

    public Course(String title) {
        this.title = title;
    }

    public void addReview(Review review){
        if(reviews == null) reviews = new ArrayList<>();
        reviews.add(review);
    }
}
