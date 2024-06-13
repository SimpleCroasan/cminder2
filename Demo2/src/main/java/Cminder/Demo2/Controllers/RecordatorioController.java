package Cminder.Demo2.Controllers;

import Cminder.Demo2.Models.Recordatorio;
import Cminder.Demo2.Repositories.RecordatorioRepository;
import Cminder.Demo2.Services.RecordatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recordatorio")
@CrossOrigin(origins = "http://localhost:4200")
public class RecordatorioController {

    @Autowired
    private RecordatorioRepository recordatorioRepository;

    @Autowired
    private RecordatorioService recordatorioService;

    @PostMapping("/insertar")
    public ResponseEntity<Recordatorio> insertar(@RequestBody Recordatorio recordatorio) {
        if (recordatorio!=null) {
            recordatorioService.insertRecordatorio(recordatorio);
            return ResponseEntity.ok(recordatorio);
        }
        return ResponseEntity.badRequest().build();

    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<String> borrar(@PathVariable long id) {
        recordatorioService.deleteRecordatorio(id);
        return ResponseEntity.ok("Borrado correctamente");
    }

    @GetMapping("/existe/{id}")
    public ResponseEntity<Boolean> existeRecordatorio(@PathVariable long id) {
        return ResponseEntity.ok(recordatorioService.recordatorioExist(id));

    }

    @GetMapping("/{id}")
    public ResponseEntity<Recordatorio> obtenerRecordatorio(@PathVariable long id) {
        if (recordatorioService.recordatorioExist(id)) {
            return ResponseEntity.ok(recordatorioService.getRecordatorio(id));

        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Recordatorio>> obtenerRecordatorioActivos() {
        if(!recordatorioService.getRecordatorios().isEmpty()){
            return ResponseEntity.ok(recordatorioService.getRecordatorios());

        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/borrarPorId/{id}")
    public ResponseEntity<String> borrarPorId(@PathVariable long id) {
        if (recordatorioService.getRecordatorioById(id) !=null) {
            recordatorioService.deleteRecordatorio(id);
            return ResponseEntity.ok("Borrado correctamente");
        }
        return ResponseEntity.badRequest().build();

    }
}
