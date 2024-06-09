import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from './nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private url = 'http://localhost:8080/nota'

  constructor(private http: HttpClient) { }

  getNotas(asignaturaId: number): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.url}/${asignaturaId}`);
  }

  insertarNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(`${this.url}/insertar`, nota);
  }

  calcularNotaFinal(asignaturaId: number): void {
    this.http.get(`http://localhost:8080/nota/promedio/${asignaturaId}`).subscribe(() => {
      
    });
  }

  borrarNota(notaId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/borrar/${notaId}`);
  }
  
  updateAsignatura(nota: Nota): Observable<void> {
    return this.http.patch<void>(`${this.url}/actualizar/${nota.id}`, nota);
  }
  
}

