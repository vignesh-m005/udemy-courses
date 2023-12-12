package com.luv2code.mvc.controller;

import com.luv2code.mvc.model.Customer;
import jakarta.validation.Valid;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CustomerController {

    //add initbinder  to convert trim input strings

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder){
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        webDataBinder.registerCustomEditor(String.class,stringTrimmerEditor);
    }

    @GetMapping("/")
    public String showForm(Model model){
        model.addAttribute("customer", new Customer());
        return "customer-form";
    }

    @PostMapping("/processForm")
    public String processForm(
            @Valid @ModelAttribute("customer") Customer customer,
            BindingResult bindingResult
    ){
        System.out.println("Last Name: |"+customer.getLastName()+"|");

        System.out.println("BindingResult: "+bindingResult);

        System.out.println("\n\n\n");

        if (bindingResult.hasErrors()){
            return "customer-form";
        }else {
            return "customer-conformation";
        }
    }
}
