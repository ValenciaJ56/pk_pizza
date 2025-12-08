package com.example.demo.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class VentaDiaria {
    private String fecha;
    private List<ProductoVendido> productosVendidos = new ArrayList<>();

    public VentaDiaria(){
        this.fecha = LocalDate.now().toString();
    }

    public String getFecha(){
        return fecha;
    }

    public List<ProductoVendido> getProductosVendidos(){
        return productosVendidos;
    }

    @Override
    public String toString() {
        return fecha + ", [" + productosVendidos + "]";
    }
}
