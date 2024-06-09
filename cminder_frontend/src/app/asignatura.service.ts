import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asignatura } from './asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  private url = 'http://localhost:8080/asignaturas'

  constructor(private http: HttpClient) { }

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.url);
  }

  insertAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.post<Asignatura>(`${this.url}/insertar`, asignatura);
  }

  deleteAsignatura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/borrar/${id}`);
  }

  updateAsignatura(asignatura: Asignatura): Observable<void> {
    return this.http.patch<void>(`${this.url}/actualizar/${asignatura.id}`, asignatura);
  }


  getPromedioPonderado(): Observable<number> {
    return this.http.get<number>(`${this.url}/promedio/ponderado`);
  }
  
}
  
  


