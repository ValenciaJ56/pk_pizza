package com.example.demo.repository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Pedido;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PedidoRepository {
    private final String archivo = "pedidos.csv";
    ObjectMapper mapper = new ObjectMapper();


    public void guardar(Pedido pedido) throws IOException {
        FileWriter fw = new FileWriter(archivo, true);

        fw.write(mapper.writeValueAsString(pedido) + "\n");
        fw.close();
    }


    public List<Pedido> listar() throws IOException {
        List<Pedido> pedidos = new ArrayList<>();
        File file = new File(archivo);

        if (!file.exists()) return pedidos;

        BufferedReader br = new BufferedReader(new FileReader(file));
        String linea;

        while ((linea = br.readLine()) != null) {
            Pedido pedido = mapper.readValue(linea, Pedido.class);
            pedidos.add(pedido);
        }   

        br.close();
        return pedidos;
    }


    public void actualizar(Pedido pedidoActualizado) throws IOException {
        List<Pedido> pedidos = listar();

        FileWriter fw = new FileWriter(archivo);

        for (Pedido pedido : pedidos) {
            if (pedido.getId() == pedidoActualizado.getId()) {
                fw.write(mapper.writeValueAsString(pedidoActualizado) + "\n");
            } else {
                fw.write(mapper.writeValueAsString(pedido) + "\n");
            }
        }

        fw.close();
    }


    public void eliminar(int id) throws IOException {
        List<Pedido> pedidos = listar();
        FileWriter fw = new FileWriter(archivo);

        for (Pedido pedido : pedidos) {
            if (pedido.getId() != id) {
                fw.write(mapper.writeValueAsString(pedido) + "\n");
            }
        }

        fw.close();
    }

    public int generarId() throws IOException {
        List<Pedido> pedidos = listar();
        int max = 0;

        for (Pedido pedido : pedidos) {
            if (pedido.getId() > max) {
                max = pedido.getId();
            }
        }
        return max + 1;
    }
}
