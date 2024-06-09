package Cminder.Demo2.Controllers;

import Cminder.Demo2.Models.Asignatura;
import Cminder.Demo2.Services.AsignaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/asignaturas")
@CrossOrigin(origins = "http://localhost:4200")
public class AsignaturaController {
    @Autowired
    private AsignaturaService asignaturaService;

    @GetMapping("")
    public ResponseEntity<List<Asignatura>> getAllAsignaturas() {

        return ResponseEntity.ok(asignaturaService.mostrarAsignaturas());
    }

    @PostMapping("/insertar")
    public ResponseEntity<String> insertarAsignatura( @RequestBody Asignatura asignatura) {
        if (asignatura.getNombre() != null && !asignatura.getNombre().isEmpty() && asignatura.getCreditos() >= 0 && asignatura.getNotaFinal() >= 0) {
            asignaturaService.insertarAsignatura(asignatura);
            return ResponseEntity.ok("Insertado");

        } else {
            return ResponseEntity.badRequest().body("Datos no validos");
        }


    }



    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<String> borrarAsignatura(@PathVariable long id) {
        Asignatura asignatura= asignaturaService.buscarAsignatura(id);
        if (asignatura != null) {
            asignaturaService.eliminarAsignatura(id);
            return ResponseEntity.ok().build();

        }
        else{
            return ResponseEntity.badRequest().body("Datos no validos");
        }

    }



        @PatchMapping("/actualizar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 204 No Content
    public void actualizarAsignaturaParcial(
            @PathVariable Long id,
            @RequestBody Map<String, Object> cambios) {

        String nombre = cambios.containsKey("nombre") ? (String) cambios.get("nombre") : null;
        Integer creditos = cambios.containsKey("creditos") ? (Integer) cambios.get("creditos") : null;

        Asignatura asignatura = asignaturaService.buscarAsignatura(id);
        if (asignatura != null) {
            if (nombre != null) {
                asignatura.setNombre(nombre);
            }
            if (creditos != null) {
                asignatura.setCreditos(creditos);
            }
            asignaturaService.insertarAsignatura(asignatura);
        }
    }

    @RequestMapping("/promedio/ponderado")
    public ResponseEntity<Double> promedioPonderado() {
        if (asignaturaService.mostrarAsignaturas().isEmpty()){
            return ResponseEntity.badRequest().body(0.0);
        }
        return ResponseEntity.ok(asignaturaService.calularPromedioPonderado());

    }


}
