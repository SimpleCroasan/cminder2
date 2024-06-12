import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recordatorio } from './recordatorio';

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {
  private url = 'http://localhost:8080/recordatorio'

  constructor(private http: HttpClient) { }

  insertarRecordatorio(recordatorio: Recordatorio): Observable<Recordatorio> {
    return this.http.post<Recordatorio>(`${this.url}/insertar`, recordatorio);
  }
  
  existeRecordatorio(tareaId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/existe/${tareaId}`);
  }


}
