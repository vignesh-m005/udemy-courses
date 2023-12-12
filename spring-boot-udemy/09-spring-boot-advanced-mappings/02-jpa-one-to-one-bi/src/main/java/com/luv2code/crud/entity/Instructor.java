package com.luv2code.crud.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "instructor", schema = "hb_01_one_to_one_uni")
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

    public Instructor(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
