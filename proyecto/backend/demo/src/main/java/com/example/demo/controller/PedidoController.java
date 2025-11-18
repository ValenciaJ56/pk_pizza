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

import com.example.demo.model.Pedido;
import com.example.demo.service.PedidoService;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService service = new PedidoService();

    // CREATE
    @PostMapping
    public String crear(@RequestBody Pedido pedido) throws Exception {
        service.crearPedido(pedido);
        return "Producto creado";
    }

    // READ
    @GetMapping
    public List<Pedido> listar() throws Exception {
        return service.listarPedidos();
    }

    // UPDATE
    @PutMapping("/{id}")
    public String actualizar(@PathVariable int id, @RequestBody Pedido pedido) throws Exception {
        service.actualizarPedido(id, pedido);
        return "Producto actualizado";
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable int id) throws Exception {
        service.eliminarPedido(id);
        return "Producto eliminado";
    }
}
