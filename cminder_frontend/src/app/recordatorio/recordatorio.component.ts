import { Component, OnInit } from '@angular/core';
import { Recordatorio } from './recordatorio';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RecordatorioService } from './recordatorio.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tarea } from '../inicio/tarea';

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

  constructor(private recordatorioService: RecordatorioService, private router: Router) { }

  ngOnInit(): void {
 
    this.nuevoRecordatorio.titulo = this.tarea.descripcion;
  }

  agregarRecordatorio(tarea: Tarea): void {
    this.nuevoRecordatorio.titulo = tarea.descripcion;
    this.recordatorioService.insertarRecordatorio(this.nuevoRecordatorio).subscribe(recordatorio => {

      this.nuevoRecordatorio = new Recordatorio(); 
    });
  }
  


  actualizarFecha(event: any): void {
    this.nuevoRecordatorio.fechaMin = new Date(event.target.value);
  }
  
}
