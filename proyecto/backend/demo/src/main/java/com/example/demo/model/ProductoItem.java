package com.example.demo.model;

public class ProductoItem {
    private Producto producto;
    private int cantidad;
    private String observacion;

    public ProductoItem(Producto producto, int cantidad, String observacion){
        this.producto = producto;
        this.cantidad = cantidad;
        this.observacion = observacion;
    }

    public void setProducto (Producto producto){
        this.producto = producto;
    }

    public void setCantidad (int c){
        this.cantidad = c;
    }

    public void setObservacion (String obs){
        this.observacion = obs;
    }

    public Producto getProducto(){
        return producto;
    }

    public int getCantidad(){
        return cantidad;
    }

    public String getObservacion(){
        return observacion;
    }

    @Override
    public String toString() {
        return "{" + producto + "," + cantidad + "," + observacion + "}";
    }

}
