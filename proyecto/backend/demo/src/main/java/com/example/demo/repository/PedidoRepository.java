package com.example.demo.repository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Pedido;
import com.example.demo.model.Producto;
import com.example.demo.model.ProductoItem;

public class PedidoRepository {
    private final String archivo = "pedidos.csv";

    public void guardar(Pedido pedido) throws IOException {
        FileWriter fw = new FileWriter(archivo, true);

        fw.write(
                pedido.getId() + "," +
                pedido.getItems() + "\n"
        );

        fw.close();
    }

    public List<Pedido> listar() throws IOException {
        List<Pedido> pedidos = new ArrayList<>();
        File file = new File(archivo);

        if (!file.exists()) {
            return pedidos;
        }

        BufferedReader br = new BufferedReader(new FileReader(file));
        String linea;

        while ((linea = br.readLine()) != null) {
            Pedido pedido = new Pedido();
            String[] data = linea.split("],");
            pedido.setEstado(data[1]);
            
            String[] datos = data[0].split(",", 2);
            if (datos.length < 2) continue;
            
            pedido.setId(Integer.parseInt(datos[0]));

            String resto_de_info = datos[1];
            resto_de_info = resto_de_info.replace("[", "").replace("]", "").trim();

            String[] productos = resto_de_info.split("\\},\\{");

            List<ProductoItem> lista = new ArrayList<>();

            for (String item : productos){
                item = item.replace("{", "").replace("}", "");
                String[] info = item.split(",");

                ProductoItem pi = new ProductoItem(
                    new Producto(Integer.parseInt(info[0]), info[1], Integer.parseInt(info[2])),
                    Integer.parseInt(info[3]), 
                    info[4]);

                lista.add(pi);
            }

            pedido.setItems(lista);

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
