package com.example.demo.service;

import java.io.IOException;
import java.util.List;

import com.example.demo.model.VentaDiaria;
import com.example.demo.repository.VentaDiariaRepository;

public class VentaDiariaService {
    private final VentaDiariaRepository repo = new VentaDiariaRepository();

    public void crearVentaDiaria(VentaDiaria venta) throws IOException {
        repo.guardar(venta);
    }

    public List<VentaDiaria> listarVentas() throws IOException {
        return repo.listar();
    }
}
