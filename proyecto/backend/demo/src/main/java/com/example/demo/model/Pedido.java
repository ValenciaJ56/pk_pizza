package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

public class Pedido {
    private int id;
    private List<ProductoItem> items = new ArrayList<>();

    public void agregarProducto(ProductoItem item) {
        items.add(item);
    }

    public void setId(int id){
        this.id = id;
    }

    public void setItems(List<ProductoItem> items){
        this.items = items;
    }

    public int getId(){
        return id;
    }

    public List<ProductoItem> getItems(){
        return items;
    }

    @Override
    public String toString() {
        return id + ", [" + items + "]";
    }

}
