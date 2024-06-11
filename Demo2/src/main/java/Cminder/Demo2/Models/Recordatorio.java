package Cminder.Demo2.Models;

import com.fasterxml.jackson.databind.DatabindException;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@NoArgsConstructor
@Getter
public class Recordatorio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Setter
    @Column(name = "titulo")
    private String titulo;

    @Setter
    @Column(name = "fechaMin")
    private LocalDate fechaMin;

    @Setter
    @Column(name = "tareaId")
    private long tareaId;


}
