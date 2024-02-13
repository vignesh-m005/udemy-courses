package com.luv2code.mvc.model;

import com.luv2code.mvc.validation.CourseCode;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Customer {

    private String firstName;

    @NotNull(message = "is required")
    @Size(min = 1, message = "is required")
    private String lastName;

    @NotNull(message = "is required")
    @Min(value = 0,message = "Must be greater than 0")
    @Max(value = 10, message = "Must be less than are equal to 10")
    private Integer freePasses;

    @Pattern(regexp = "^[0-9]{6}",message = "Only 6 digits")
    private String postalCode;

    @CourseCode(value = "TOP", message = "Code must start with TOP")
    private String courseCode;
}
