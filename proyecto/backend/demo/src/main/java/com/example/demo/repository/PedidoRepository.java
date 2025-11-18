package com.example.demo.repository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Pedido;
import com.example.demo.model.ProductoItem;

public class PedidoRepository {
    private final String archivo = "pedidos.csv";

    // ----------------- CREATE -----------------
    public void guardar(Pedido pedido) throws IOException {
        FileWriter fw = new FileWriter(archivo, true);

        fw.write(
                pedido.getId() + "," +
                pedido.getItems() + "\n"
        );

        fw.close();
    }

    // ----------------- READ -----------------
    public List<Pedido> listar() throws IOException {
        List<Pedido> pedidos = new ArrayList<>();
        File file = new File(archivo);

        // Si el archivo NO existe, devolver lista vacía
        if (!file.exists()) {
            return pedidos;
        }

        BufferedReader br = new BufferedReader(new FileReader(file));
        String linea;

        while ((linea = br.readLine()) != null) {
            String[] datos = linea.split(",");

            if (datos.length < 3) continue; // línea inválida

            Pedido pedido = new Pedido();
            pedido.setId(Integer.parseInt(datos[0]));
            List<ProductoItem> lista = new ArrayList<>();
            pedido.setItems(lista);

            pedidos.add(pedido);
        }

        br.close();
        return pedidos;
    }

    // ----------------- UPDATE -----------------
    public void actualizar(Pedido pedidoActualizado) throws IOException {
        List<Pedido> pedidos = listar();
        FileWriter fw = new FileWriter(archivo);

        for (Pedido pedido : pedidos) {
            if (pedido.getId() == pedidoActualizado.getId()) {
                fw.write(
                        pedidoActualizado.getId() + "," +
                        pedidoActualizado.getItems() + "\n"
                );
            } else {
                fw.write(
                        pedido.getId() + "," +
                        pedido.getItems() + "\n"
                );
            }
        }

        fw.close();
    }

    // ----------------- DELETE -----------------
    public void eliminar(int id) throws IOException {
        List<Pedido> pedidos = listar();
        FileWriter fw = new FileWriter(archivo);

        for (Pedido pedido : pedidos) {
            if (pedido.getId() != id) {
                fw.write(
                        pedido.getId() + "," +
                        pedido.getItems() + "\n"
                );
            }
        }

        fw.close();
    }

    // ----------------- GENERAR ID AUTOMÁTICO -----------------
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
