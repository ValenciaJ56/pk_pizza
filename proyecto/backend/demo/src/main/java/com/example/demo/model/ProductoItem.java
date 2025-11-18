package com.example.demo.model;

public class ProductoItem {
    private Producto producto;
    private int cantidad;
    private String observacion;

    public ProductoItem(Producto p, int cantidad, String observacion){
        this.producto = p;
        this.cantidad = cantidad;
        this.observacion = observacion;
    }

    public void setProducto (Producto p){
        this.producto = p;
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
