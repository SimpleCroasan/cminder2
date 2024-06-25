import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { Recordatorio } from '../recordatorio/recordatorio';
import { RecordatorioService } from '../recordatorio/recordatorio.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, NgIf,NgFor, MatTooltipModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  calendarVisible = true;
  tituloRecordatorio: string = '';
  mostrarModalRecordatorio = false;
  fechaSeleccionada: string = '';
  mostrarModalRecordatorioBorrar = false;
  recordatorios: Recordatorio[] = [];
  selectedItems: Recordatorio[] = [];
  


  calendarEvents: Array<{ title: string; start: string; allDay: boolean }> = [];
  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: this.calendarEvents,
    dateClick: this.handleDateClick.bind(this),
    eventDidMount: this.customizeEvent.bind(this)
  };

  constructor(private recordatorioService: RecordatorioService) {}

  ngOnInit() {
    this.cargarRecordatorios();
    this.recordatorioService.getAllRecordatorio().subscribe((recordatorios) => {
      this.calendarEvents = recordatorios.map((recordatorio) => ({
        title: recordatorio.titulo as string,
        start: new Date(recordatorio.fechaMin).toISOString().split('T')[0], // Formatea la fecha
        allDay: true
      }));
      this.calendarOptions.events = this.calendarEvents;
    });
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleDateClick(arg: any) {
    if (confirm('¿Deseas agregar un evento a ' + arg.dateStr + '?')) {
      this.mostrarModalRecordatorio = true;
      this.fechaSeleccionada = new Date(arg.dateStr).toISOString().split('T')[0];
    }
  }

  insertarRecordatorio() {
    const nuevoRecordatorio: Recordatorio = {
      titulo: this.tituloRecordatorio,
      fechaMin: new Date(this.fechaSeleccionada)
    };

    this.recordatorioService.insertarRecordatorio(nuevoRecordatorio).subscribe((recordatorioInsertado) => {
      console.log('Recordatorio insertado:', recordatorioInsertado);
      this.mostrarModalRecordatorio = false;
      window.location.reload();
    });
  }

  actualizarTitulo(event: any) {
    if (event.target) {
      this.tituloRecordatorio = event.target.value;
    }
  }

  customizeEvent(info: any) {
    info.event.setProp('start', new Date(info.event.start).toISOString());
  }


  cargarRecordatorios(): void {
    this.recordatorioService.getAllRecordatorio().subscribe(recordatorios => {
      this.recordatorios = recordatorios;
    });
  }

  abrirModal() {
    this.mostrarModalRecordatorioBorrar = true;
  }

  cerrarModal() {
    this.mostrarModalRecordatorioBorrar = false;
  }

  selectItem(item: Recordatorio): void {
    this.selectedItems.push(item);
  }

  borrarRecordatoriosSeleccionados(): void {
    this.selectedItems.forEach(recordatorio => {
      if (recordatorio.id !== undefined) {
        this.recordatorioService.borrarRecordatorioPorId(recordatorio.id).subscribe(() => {
          console.log(`Recordatorio con id ${recordatorio.id} borrado exitosamente`);
        });
      }
    });
    this.selectedItems = [];
    this.cerrarModal();
    window.location.reload();
  }

  
}