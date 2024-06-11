package Cminder.Demo2.Services;

import Cminder.Demo2.Models.Tarea;
import Cminder.Demo2.Repositories.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareaService {
    @Autowired
    private TareaRepository tareaRepository;


    public List<Tarea> findAll() {
        return tareaRepository.findAll();
    }

    public Tarea findById(long id) {
        return tareaRepository.findById(id).get();
    }

    public void deleteTarea(long id) {
        tareaRepository.deleteById(id);
    }

    public void AgregarTarea(Tarea tarea) {
        tareaRepository.save(tarea);
    }

    public void ModificarTarea(Tarea tarea) {
        tareaRepository.save(tarea);
    }



}
