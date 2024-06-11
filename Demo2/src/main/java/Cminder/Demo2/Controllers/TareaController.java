package Cminder.Demo2.Controllers;

import Cminder.Demo2.Models.Tarea;
import Cminder.Demo2.Services.TareaService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tarea")
@CrossOrigin(origins = "http://localhost:4200")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    @GetMapping("")
    public ResponseEntity<List<Tarea>> getTareas() {
        List<Tarea> tareas = tareaService.findAll();
        if(tareas != null && !tareas.isEmpty()) {
            return ResponseEntity.ok(tareas);
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping("/insertar")
    public ResponseEntity<Tarea> insertarTarea(@RequestBody Tarea tarea) {
        if (tarea != null){
            tareaService.AgregarTarea(tarea);
            return ResponseEntity.ok(tarea);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<String> borrarTarea(@PathVariable long id) {
        tareaService.deleteTarea(id);
        return ResponseEntity.ok("Tarea eliminada");

    }

    @PatchMapping("/actualizar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 204 No Content
    public void actualizarTareaParcial(
            @PathVariable Long id,
            @RequestBody Map<String, Object> cambios) {


        String descripcion = cambios.containsKey("descripcion") ? (String) cambios.get("descripcion") : null;


        Tarea tarea = tareaService.findById(id);
        if (tarea != null) {

            if (descripcion != null) {
                tarea.setDescripcion(descripcion);
            }

            tareaService.AgregarTarea(tarea);
        }
    }



}
