package com.luv2code.demo.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StudentErrorResponse {

    private String message;
    private int statusCode;
    private long timestamp;

}
