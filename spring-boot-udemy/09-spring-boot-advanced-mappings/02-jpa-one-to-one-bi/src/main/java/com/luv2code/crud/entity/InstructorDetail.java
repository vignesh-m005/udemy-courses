package com.luv2code.crud.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "instructor_detail",schema = "hb_01_one_to_one_uni")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class InstructorDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "youtube_channel")
    private String youtubeChannel;

    @Column(name = "hobby")
    private String hobby;

    @OneToOne(mappedBy = "instructorDetail", cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @ToString.Exclude
    private Instructor instructor;

    public InstructorDetail(String youtubeChannel, String hobby) {
        this.youtubeChannel = youtubeChannel;
        this.hobby = hobby;
    }
}
