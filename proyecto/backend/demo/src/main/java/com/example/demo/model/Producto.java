package com.example.demo.model;

public class Producto {
    private int id;
    private String nombre;
    private int precio;

    public int getId(){
        return id;
    }

    public String getNombre(){
        return nombre;
    }

    public int getPrecio(){
        return precio;
    }

    public void setId(int id){
        this.id = id;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public void setPrecio(int precio){
        this.precio = precio;
    }


    @Override
    public String toString() {
        return "{" + id + "," + nombre + "," + precio + "}";
    }

}
