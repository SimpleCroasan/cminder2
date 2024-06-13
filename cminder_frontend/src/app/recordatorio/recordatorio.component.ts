import { Component, OnInit } from '@angular/core';
import { Recordatorio } from './recordatorio';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordatorioService } from './recordatorio.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tarea } from '../inicio/tarea';
import { DataService } from '../inicio/data.service';

@Component({
  selector: 'app-recordatorio',
  standalone: true,
  imports: [NgFor,NgIf, MatDatepickerModule,MatNativeDateModule, MatFormFieldModule,MatInputModule],
  templateUrl: './recordatorio.component.html',
  styleUrl: './recordatorio.component.css'
})
export class RecordatorioComponent implements OnInit {
  nuevoRecordatorio: Recordatorio = new Recordatorio();
  tarea:Tarea = new Tarea();
  tareaId:number;
  recordatorioId:number;
  existeRecordatorio: boolean;
  recordatorioBorrar: Recordatorio | undefined;

  constructor(private recordatorioService: RecordatorioService, private router: Router, private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.tareaActual.subscribe(tarea => this.tarea = tarea);
    this.nuevoRecordatorio.titulo = this.tarea.descripcion; 
    this.tareaId = Number(this.route.snapshot.paramMap.get('id'));

    this.recordatorioService.existeRecordatorio(this.tareaId).subscribe(existe => {
      this.existeRecordatorio = existe;
    });
  }

  agregarRecordatorio(): void {
    this.nuevoRecordatorio.tareaId = this.tareaId;
   
    
    this.recordatorioService.insertarRecordatorio(this.nuevoRecordatorio).subscribe(recordatorio => {
    
      this.nuevoRecordatorio = new Recordatorio(); 
      
    });
    this.irATareas();
  }
  
  


  actualizarFecha(event: any): void {
    this.nuevoRecordatorio.fechaMin = new Date(event.target.value);
  }
  

  irATareas(): void {
    this.router.navigate(["/"]); 
  }
  borrarRecordatorioPorTarea(): void {
    this.recordatorioService.obtenerRecordatorioPorTarea(this.tareaId).subscribe(recordatorio => {
      if (recordatorio && recordatorio.id !== undefined) {
        this.recordatorioService.borrarRecordatorio(recordatorio.id).subscribe(() => {
          console.log('Recordatorio borrado exitosamente');
          this.irATareas();
          // Aquí puedes actualizar la lista de recordatorios o redirigir al usuario, etc.
        });
      } else {
        console.log('No se encontró ningún recordatorio para esta tarea');
        this.irATareas();
      }
      this.irATareas();
    });
  }
  


}
