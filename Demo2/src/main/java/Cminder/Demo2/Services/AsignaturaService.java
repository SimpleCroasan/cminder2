package Cminder.Demo2.Services;

import Cminder.Demo2.Models.Asignatura;
import Cminder.Demo2.Repositories.AsignaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AsignaturaService{
    @Autowired
    AsignaturaRepository asignaturaRepository;

    public List<Asignatura> mostrarAsignaturas(){

        return asignaturaRepository.findAll();

    }


    public Asignatura insertarAsignatura(Asignatura asignatura){

        return asignaturaRepository.save(asignatura);
    }

    public void eliminarAsignatura(Long id){
        asignaturaRepository.deleteById(id);

    }
    public Asignatura buscarAsignatura(Long id){
        return asignaturaRepository.findById(id).get();
    }

    public void actualizarAsignatura(Long id, String nombre, int creditos) {
        Optional<Asignatura> optionalAsignatura = asignaturaRepository.findById(id);

        if (optionalAsignatura.isPresent()) {
            Asignatura asignatura = optionalAsignatura.get();
            asignatura.setNombre(nombre);
            asignatura.setCreditos(creditos);
            asignaturaRepository.save(asignatura);
        }
    }

    public Double calularPromedioPonderado(){
        List<Asignatura> asignaturas = asignaturaRepository.findAll();
        int numeroCreditos=asignaturas.stream().mapToInt(Asignatura::getCreditos).sum();
        return asignaturas.stream().mapToDouble(asignatura -> asignatura.getCreditos() * asignatura.getNotaFinal()/numeroCreditos).sum();
    }


}
