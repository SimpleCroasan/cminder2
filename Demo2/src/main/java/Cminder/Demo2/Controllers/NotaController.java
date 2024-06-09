package Cminder.Demo2.Controllers;

import Cminder.Demo2.Models.Asignatura;
import Cminder.Demo2.Models.Nota;
import Cminder.Demo2.Services.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/nota")
@CrossOrigin(origins = "http://localhost:4200")
public class NotaController {
    @Autowired
    private NotaService notaService;


    @GetMapping("/{id}")
    public ResponseEntity<List<Nota>> getNota(@PathVariable long id) {
        if (notaService.mostrarNotasPorId(id).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(notaService.mostrarNotasPorId(id));
    }


    @PostMapping("/insertar")
        public ResponseEntity<String> insertar(@RequestBody Nota nota) {

        if(nota != null){
            notaService.AgregarNota(nota);
            return ResponseEntity.ok("Insertado Correctamente");
        }else{
            return ResponseEntity.badRequest().body("Error al insertar");
        }
}

    @GetMapping("/promedio/{id}")
    public ResponseEntity<Double> getNotaPromedio(@PathVariable long id) {
        return ResponseEntity.ok(notaService.calcularPromedio(id));
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<String> borrarNota(@PathVariable long id) {
        notaService.eliminarNota(id);
        return ResponseEntity.ok("Borrado Correctamente");
    }


    @PatchMapping("/actualizar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 204 No Content
    public void actualizarAsignaturaParcial(
            @PathVariable Long id,
            @RequestBody Map<String, Object> cambios) {

        String nombre = cambios.containsKey("nombre") ? (String) cambios.get("nombre") : null;
        Double valor = cambios.containsKey("valor") ? ((Number) cambios.get("valor")).doubleValue() : null;
        Double porcentaje = cambios.containsKey("porcentaje") ? ((Number) cambios.get("porcentaje")).doubleValue() : null;

        Nota nota = notaService.buscarNotaPorIdNota(id);
        if (nota != null) {
            if (nombre != null) {
                nota.setTitulo(nombre);
            }
            if (valor != null) {
                nota.setValor(valor);
            }
            if (porcentaje != null) {
                nota.setPorcentaje(porcentaje);
            }
            notaService.AgregarNota(nota);
        }
    }

}
