import { Component } from '@angular/core';
import { Asignatura } from '../asignatura';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { AsignaturaService } from '../asignatura.service';
import { tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaturas',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent {
  nuevaAsignatura: Asignatura = new Asignatura();
  asignaturaActualizar: Asignatura = new Asignatura();
  asignaturas: Asignatura[] = [];
  mostrarModal = false;
  mostrarModalBorrar = false;
  mostrarModalActualizar = false;
  promedioPonderado: number;



  constructor(private asignaturaService: AsignaturaService, private cdr: ChangeDetectorRef,private router: Router) { }

  ngOnInit(): void {
    this.getAsignaturas();
  }

  getAsignaturas(): void {
    this.asignaturaService.getAsignaturas().subscribe(asignaturas => this.asignaturas = asignaturas);
  }

  agregarAsignatura(event: Event): void {
    this.asignaturaService.insertAsignatura(this.nuevaAsignatura).pipe(
      tap((asignatura: Asignatura) => {
        this.asignaturas.push(asignatura);
        this.nuevaAsignatura = new Asignatura();
        this.mostrarModal = false;
        this.cdr.markForCheck(); 
        
      })
    ).subscribe(() => {}, () => {}, () => this.getAsignaturas());
    
  }
  
  actualizarNombre(event: any): void {
    this.nuevaAsignatura.nombre = event.target.value;
  }

  actualizarCreditos(event: any): void {
    this.nuevaAsignatura.creditos = Number(event.target.value);
  }


  // borrar



  asignaturaABorrar: Asignatura | null = null;

  borrarAsignatura(): void {
    if (this.asignaturaABorrar && this.asignaturaABorrar.id !== undefined) {
      this.asignaturaService.deleteAsignatura(this.asignaturaABorrar.id).subscribe(() => {
        this.asignaturas = this.asignaturas.filter(a => a !== this.asignaturaABorrar);
        this.asignaturaABorrar = null;
        this.mostrarModalBorrar = false;
      });
    }
  }
confirmarBorrar(asignatura: Asignatura): void {
  this.asignaturaABorrar = asignatura;
  this.mostrarModalBorrar = true;
}



// actualizar

actualizarAsignatura(): void {
  if (this.asignaturaActualizar.id !== undefined) {
    this.asignaturaService.updateAsignatura(this.asignaturaActualizar).subscribe(() => {
      this.asignaturas = this.asignaturas.map(a => a.id === this.asignaturaActualizar.id ? this.asignaturaActualizar : a);
      this.asignaturaActualizar = new Asignatura();
      this.mostrarModalActualizar = false;
    });
  }
}

confirmarActualizar(asignatura: Asignatura): void {
  this.asignaturaActualizar = Object.assign(new Asignatura(), asignatura); // Crear una copia de la asignatura para evitar la mutación del objeto original
  this.mostrarModalActualizar = true;
}


actualizarNombreActualizacion(event: any): void {
  this.asignaturaActualizar.nombre = event.target.value;
}

actualizarCreditosActualizacion(event: any): void {
  this.asignaturaActualizar.creditos = Number(event.target.value);
}




//notas

verNotas(asignatura: Asignatura): void {
  this.router.navigate(['/notas', asignatura.id]);
}





obtenerPromedioPonderado(): void {
  this.asignaturaService.getPromedioPonderado().subscribe(promedio => {
    this.promedioPonderado = promedio;
  });
}

}
