import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { ModalComponentexport } from '../modal/modal.component';
import { TareaService } from './tarea.service';
import { Tarea } from './tarea';
import { Router } from '@angular/router';
import{DataService} from './data.service';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ModalComponentexport,NgIf,NgFor],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  showModal = false;
  mostrarModalActualizar: boolean = false;
  tareas: Tarea[] = [];
  nuevaTarea: Tarea = new Tarea();
  tareaActualizar: Tarea = new Tarea();
  constructor(private tareaService: TareaService, private router: Router, private dataService:DataService) {}

  ngOnInit(): void {
    this.showModal = true;
    this.getTareas();
  }

  getTareas(): void {
    this.tareaService.getTareas().subscribe(asignaturas => this.tareas = asignaturas);
  }



  agregarTarea(event: Event): void {
    this.tareaService.insertarTarea(this.nuevaTarea).subscribe(
      (tarea: Tarea) => {
        this.tareas.push(tarea);
        this.nuevaTarea = new Tarea();
      },
      error => {
        console.error('Error al insertar tarea:', error);
      },
      () => this.getTareas()
    );
  }
  
  actualizarDescripcion(event: any): void {
    this.nuevaTarea.descripcion = event.target.value;
  }
  loading: boolean = false;


    borrarTarea(tarea: Tarea): void {
      if (tarea && tarea.id !== undefined) {
        this.loading = true; 
        this.tareaService.borrarTarea(tarea.id).subscribe(
          () => {
            
            this.tareas = this.tareas.filter(t => t.id !== tarea.id);
            this.loading = false; 
          },
          error => {
          
            console.error('Error al borrar la tarea:', error);
            this.loading = false; 
            location.reload();
          }
        );
      }
    }




  confirmarActualizar(tarea: Tarea): void {
    this.tareaActualizar = Object.assign(new Tarea(), tarea); // Crear una copia de la tarea para evitar la mutación del objeto original
    this.mostrarModalActualizar = true;
  }
  actualizarTarea(): void {
    if (this.tareaActualizar.id !== undefined) {
      this.tareaService.actualizarTarea(this.tareaActualizar).subscribe(() => {
        this.tareas = this.tareas.map(a => a.id === this.tareaActualizar.id ? this.tareaActualizar : a);
        this.tareaActualizar = new Tarea();
        this.mostrarModalActualizar = false;
      });
    }
  }

  actualizarDescripcionActual(event: any): void {
    this.tareaActualizar.descripcion = event.target.value;
  }
  
  abrirRecordatorio(tarea: Tarea): void {
    this.dataService.cambiarTarea(tarea); // Guarda la tarea en el servicio de datos
    this.router.navigate(['/recordatorio', tarea.id]); // Navega al componente de recordatorio
  }
  

cerrarModal(): void {
  this.mostrarModalActualizar = false;
}






}
