package Cminder.Demo2.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Table(name = "Nota")
@NoArgsConstructor

public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;

    @Setter
    @Column(name="titulo")
    private String titulo;

    @Setter
    @Column(name="valor")
    private double valor;

    @Setter
    @Column(name="porcentaje")
    private double porcentaje;

    @Setter
    @Column(name="asignaturaId")
    private long asignaturaId;

}
