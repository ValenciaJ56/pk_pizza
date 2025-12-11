package com.example.demo.repository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Pedido;
import com.example.demo.model.VentaDiaria;
import com.fasterxml.jackson.databind.ObjectMapper;

public class VentaDiariaRepository {
    private final String archivo = "historico.csv";

    ObjectMapper mapper = new ObjectMapper();

    public void guardar(VentaDiaria venta) throws IOException {
        FileWriter fw = new FileWriter(archivo, true);

        fw.write(mapper.writeValueAsString(venta) + "\n");
        fw.close();
    }

    public List<VentaDiaria> listar() throws IOException {
        List<VentaDiaria> ventas = new ArrayList<>();
        File file = new File(archivo);

        if (!file.exists()) return ventas;

        BufferedReader br = new BufferedReader(new FileReader(file));
        String linea;

        while ((linea = br.readLine()) != null) {
            VentaDiaria venta = mapper.readValue(linea, VentaDiaria.class);
            ventas.add(venta);
        }   

        br.close();
        return ventas;
    }

    public String generarFecha() throws IOException {
        String fecha = "hoy";
        return fecha;
    }

    public int generarId() throws IOException {
        List<VentaDiaria> ventas = listar();
        int max = 0;

        for (VentaDiaria venta : ventas) {
            if (venta.getId() > max) {
                max = venta.getId();
            }
        }
        return max + 1;
    }

}
