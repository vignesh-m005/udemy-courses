package com.luv2code.aopdemo.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Account {

    private String name;
    private String level;
}
