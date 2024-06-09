package Cminder.Demo2.Repositories;

import Cminder.Demo2.Models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
    @Query("SELECT n FROM Nota n WHERE n.asignaturaId =:asignaturaId")
    List<Nota> findByAsignaturaId(Long asignaturaId);


}
