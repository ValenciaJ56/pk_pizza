package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.VentaDiaria;
import com.example.demo.service.VentaDiariaService;

@RestController
@RequestMapping("/api/ventas_diarias")
public class VentaDiariaController {
    private final VentaDiariaService service = new VentaDiariaService();

    @PostMapping
    public String crear(@RequestBody VentaDiaria venta) throws Exception {
        service.crearVentaDiaria(venta);
        return "Venta agregada";
    }

    @GetMapping
    public List<VentaDiaria> listar() throws Exception {
        return service.listarVentas();
    }
}
