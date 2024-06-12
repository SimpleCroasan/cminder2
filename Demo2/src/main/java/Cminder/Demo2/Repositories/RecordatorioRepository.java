package Cminder.Demo2.Repositories;

import Cminder.Demo2.Models.Recordatorio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordatorioRepository extends JpaRepository<Recordatorio, Long> {

    @Query("SELECT r FROM Recordatorio r WHERE r.tareaId =:id ")
    Recordatorio findByTareaId(Long id);
}
