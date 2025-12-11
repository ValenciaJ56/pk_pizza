package com.example.demo.model;

public class ProductoVendido {
    private int id;
    private int cantidad;
    private String nombre;
    private int precio;

    public ProductoVendido(int id, int cantidad, String nombre, int precio){
        this.id = id;
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.precio = precio;
    }
    
    public ProductoVendido(){}

    public int getId(){
        return id;
    }

    public int getCantidad(){
        return cantidad;
    }

    public int getPrecio(){
        return precio;
    }

    public String getNombre(){
        return nombre;
    }

    @Override
    public String toString() {
        return id + ":[" + nombre + "," + cantidad + "," + precio + "]";
    }
}
