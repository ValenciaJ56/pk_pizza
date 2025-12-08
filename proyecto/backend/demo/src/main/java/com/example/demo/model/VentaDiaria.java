package com.example.demo.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class VentaDiaria {
    private int id;
    private String fecha;
    private List<ProductoVendido> productosVendidos = new ArrayList<>();
    private int total;

    public VentaDiaria(){
        this.fecha = LocalDate.now().toString();
    }

    public String getFecha(){
        return fecha;
    }

    public List<ProductoVendido> getProductosVendidos(){
        return productosVendidos;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public int getTotal(){
        return total;
    }

    @Override
    public String toString() {
        return id + "," + fecha + ", [" + productosVendidos + "]";
    }
}
