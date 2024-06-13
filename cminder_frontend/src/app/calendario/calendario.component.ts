import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { Recordatorio } from '../recordatorio/recordatorio';
import { RecordatorioService } from '../recordatorio/recordatorio.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, NgIf,NgFor],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  calendarVisible = true;
  calendarEvents: Array<{ title: string, start: string, allDay: boolean }> = [];
  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: this.calendarEvents,
    dateClick: this.handleDateClick.bind(this) // bind to component context
  };

  constructor(private recordatorioService: RecordatorioService) { } // Inyecta tu servicio

  ngOnInit() {
    this.recordatorioService.getAllRecordatorio().subscribe((recordatorios) => {
      // Asegúrate de que tus recordatorios se formatean correctamente para FullCalendar
      this.calendarEvents = recordatorios.map(recordatorio => ({
        title: recordatorio.titulo as string,
        start: new Date(recordatorio.fechaMin).toISOString(),
        allDay: true
      }));
      this.calendarOptions.events = this.calendarEvents;
    });
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleDateClick(arg: any) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents.push({ // add new event data. must create new array
        title: 'New Event',
        start: arg.dateStr,
        allDay: arg.allDay
      });
      this.calendarOptions.events = this.calendarEvents;
    }
  }
}
