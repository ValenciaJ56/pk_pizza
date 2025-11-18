package com.example.demo.repository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Producto;

public class ProductoRepository {

    private final String archivo = "productos.csv";

    // ----------------- CREATE -----------------
    public void guardar(Producto producto) throws IOException {
        FileWriter fw = new FileWriter(archivo, true);

        fw.write(
                producto.getId() + "," +
                producto.getNombre() + "," +
                producto.getPrecio() + "\n"
        );

        fw.close();
    }

    // ----------------- READ -----------------
    public List<Producto> listar() throws IOException {
        List<Producto> productos = new ArrayList<>();
        File file = new File(archivo);

        // Si el archivo NO existe, devolver lista vacía
        if (!file.exists()) {
            return productos;
        }

        BufferedReader br = new BufferedReader(new FileReader(file));
        String linea;

        while ((linea = br.readLine()) != null) {
            String[] datos = linea.split(",");

            if (datos.length < 3) continue; // línea inválida

            Producto p = new Producto();
            p.setId(Integer.parseInt(datos[0]));
            p.setNombre(datos[1]);
            p.setPrecio(Integer.parseInt(datos[2]));

            productos.add(p);
        }

        br.close();
        return productos;
    }

    // ----------------- UPDATE -----------------
    public void actualizar(Producto productoActualizado) throws IOException {
        List<Producto> productos = listar();
        FileWriter fw = new FileWriter(archivo);

        for (Producto p : productos) {
            if (p.getId() == productoActualizado.getId()) {
                fw.write(
                        productoActualizado.getId() + "," +
                        productoActualizado.getNombre() + "," +
                        productoActualizado.getPrecio() + "\n"
                );
            } else {
                fw.write(
                        p.getId() + "," +
                        p.getNombre() + "," +
                        p.getPrecio() + "\n"
                );
            }
        }

        fw.close();
    }

    // ----------------- DELETE -----------------
    public void eliminar(int id) throws IOException {
        List<Producto> productos = listar();
        FileWriter fw = new FileWriter(archivo);

        for (Producto p : productos) {
            if (p.getId() != id) {
                fw.write(
                        p.getId() + "," +
                        p.getNombre() + "," +
                        p.getPrecio() + "\n"
                );
            }
        }

        fw.close();
    }

    // ----------------- GENERAR ID AUTOMÁTICO -----------------
    public int generarId() throws IOException {
        List<Producto> productos = listar();
        int max = 0;

        for (Producto p : productos) {
            if (p.getId() > max) {
                max = p.getId();
            }
        }

        return max + 1;
    }
}
