package Cminder.Demo2.Services;

import Cminder.Demo2.Models.Asignatura;
import Cminder.Demo2.Models.Nota;
import Cminder.Demo2.Repositories.AsignaturaRepository;
import Cminder.Demo2.Repositories.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotaService {
    @Autowired
    NotaRepository notaRepository;
    @Autowired
    AsignaturaRepository asignaturaRepository;
    public List<Nota> mostrarNotasPorId(long id) {

        return notaRepository.findByAsignaturaId(id);
    }

    public Nota buscarNotaPorIdNota(long id) {
        return notaRepository.findById(id).get();
    }

    public Nota AgregarNota(Nota nota) {
        return notaRepository.save(nota);
    }

    public void eliminarNota(long id) {
        notaRepository.deleteById(id);
    }

    public double calcularPromedio(long id){

            List<Nota> notas = notaRepository.findByAsignaturaId(id);
            if(!notas.isEmpty()) {
            double sumaPonderada = notas.stream()
                    .mapToDouble(nota -> nota.getValor() * nota.getPorcentaje())
                    .sum();
            double sumaPorcentajes = notas.stream()
                    .mapToDouble(Nota::getPorcentaje)
                    .sum();

            if (sumaPorcentajes>1.0){

                return 0;
            }else{

                Asignatura asignatura =asignaturaRepository.findById(id).get();
                asignatura.setNotaFinal(sumaPonderada);
                asignaturaRepository.save(asignatura);
                return sumaPonderada;
            }

        }else{

            return 0;
        }
    }







}
