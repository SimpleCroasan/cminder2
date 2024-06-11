import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from './tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private API_URL = 'http://localhost:8080/tarea';

  constructor(private http: HttpClient) { }

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.API_URL);
  }

  insertarTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>('http://localhost:8080/tarea/insertar', tarea);
  }
  
  borrarTarea(tareaId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/borrar/${tareaId}`);
  }

  actualizarTarea(tarea: Tarea): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/actualizar/${tarea.id}`, tarea);
  }
  
}
