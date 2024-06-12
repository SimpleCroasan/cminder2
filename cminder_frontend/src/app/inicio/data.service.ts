import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarea } from './tarea';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private tareaSource = new BehaviorSubject(new Tarea());
  tareaActual = this.tareaSource.asObservable();

  constructor() { }

  cambiarTarea(tarea: Tarea) {
    this.tareaSource.next(tarea);
  }
}
