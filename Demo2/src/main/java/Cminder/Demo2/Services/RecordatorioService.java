package Cminder.Demo2.Services;

import Cminder.Demo2.Models.Recordatorio;
import Cminder.Demo2.Repositories.RecordatorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class RecordatorioService {

    @Autowired
    private RecordatorioRepository recordatorioRepository;

    public List<Recordatorio> getRecordatorios() {
        List<Recordatorio> recordatoriosTotal= recordatorioRepository.findAll();
        List<Recordatorio> recordatoriosActivos = new ArrayList();
        LocalDate fechaActual = LocalDate.now();

        for (Recordatorio recordatorio : recordatoriosTotal) {
            if (!fechaActual.isBefore(recordatorio.getFechaMin())) {
                recordatoriosActivos.add(recordatorio);
            }
        }

        return recordatoriosActivos;
    }

    public void insertRecordatorio(Recordatorio recordatorio) {
        recordatorioRepository.save(recordatorio);
    }

    public void deleteRecordatorio(long id) {
        recordatorioRepository.deleteById(id);

    }

    public boolean recordatorioExist(long id) {
        if (recordatorioRepository.findByTareaId(id)!= null) {
            return true;
        }else{
            return false;
        }
    }

    public Recordatorio getRecordatorio(long id) {
        return recordatorioRepository.findByTareaId(id);
    }

    public Recordatorio getRecordatorioById(long id) {
        return recordatorioRepository.findById(id).get();
    }
    public List<Recordatorio> getRecordatoriosTotales() {
        return recordatorioRepository.findAll();
    }



}
