package Cminder.Demo2.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Table(name = "Asignatura")
@NoArgsConstructor
public class Asignatura {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter
    private long id;

    @Setter
    @Column(name="nombre")
    private String nombre;

    @Setter
    @Column(name="creditos")
    private int creditos;

    @Setter
    @Column(name = "NotaFinal")
    private double notaFinal;



}
