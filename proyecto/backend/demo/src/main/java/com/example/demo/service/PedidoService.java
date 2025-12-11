package com.example.demo.service;

import java.io.IOException;
import java.util.List;

import com.example.demo.model.Pedido;
import com.example.demo.repository.PedidoRepository;

public class PedidoService {
    private final PedidoRepository repo = new PedidoRepository();

    // CREATE
    public void crearPedido(Pedido pedido) throws IOException {
        pedido.setId(repo.generarId());
        repo.guardar(pedido);
    }

    // READ
    public List<Pedido> listarPedidos() throws IOException {
        return repo.listar();
    }

    // UPDATE
    public void actualizarPedido(int id, Pedido pedido) throws IOException {
        pedido.setId(id);
        repo.actualizar(pedido);
    }

    // DELETE
    public void eliminarPedido(int id) throws IOException {
        repo.eliminar(id);
    }

    public void eliminarTodo() throws IOException {
        repo.eliminarTodo();
    }
}
