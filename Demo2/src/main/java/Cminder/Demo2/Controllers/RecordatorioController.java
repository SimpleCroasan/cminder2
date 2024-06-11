package Cminder.Demo2.Controllers;

import Cminder.Demo2.Models.Recordatorio;
import Cminder.Demo2.Repositories.RecordatorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recordatorio")
@CrossOrigin(origins = "http://localhost:4200")
public class RecordatorioController {

    @Autowired
    private RecordatorioRepository recordatorioRepository;

    @PostMapping("/insertar")
    public ResponseEntity<Recordatorio> insertar(@RequestBody Recordatorio recordatorio) {
        if (recordatorio!=null) {
            recordatorioRepository.save(recordatorio);
            return ResponseEntity.ok(recordatorio);
        }
        return ResponseEntity.badRequest().build();

    }


}
