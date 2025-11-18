package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Producto;
import com.example.demo.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService service = new ProductoService();

    // CREATE
    @PostMapping
    public String crear(@RequestBody Producto p) throws Exception {
        service.crearProducto(p);
        return "Producto creado";
    }

    // READ
    @GetMapping
    public List<Producto> listar() throws Exception {
        return service.listarProductos();
    }

    // UPDATE
    @PutMapping("/{id}")
    public String actualizar(@PathVariable int id, @RequestBody Producto p) throws Exception {
        service.actualizarProducto(id, p);
        return "Producto actualizado";
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable int id) throws Exception {
        service.eliminarProducto(id);
        return "Producto eliminado";
    }
}
