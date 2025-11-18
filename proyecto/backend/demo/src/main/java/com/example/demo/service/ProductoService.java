package com.example.demo.service;

import java.io.IOException;
import java.util.List;

import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;

public class ProductoService {

    private final ProductoRepository repo = new ProductoRepository();

    // CREATE
    public void crearProducto(Producto p) throws IOException {
        if (p.getPrecio() < 0) {
            throw new IllegalArgumentException("El precio no puede ser negativo");
        }

        p.setId(repo.generarId());
        repo.guardar(p);
    }

    // READ
    public List<Producto> listarProductos() throws IOException {
        return repo.listar();
    }

    // UPDATE
    public void actualizarProducto(int id, Producto p) throws IOException {
        p.setId(id);
        repo.actualizar(p);
    }

    // DELETE
    public void eliminarProducto(int id) throws IOException {
        repo.eliminar(id);
    }
}
