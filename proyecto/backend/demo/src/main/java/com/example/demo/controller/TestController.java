package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/api/prueba")
public class TestController {

    @GetMapping
    public String hola() {
        return "Hola desde el backend!";
    }
}
