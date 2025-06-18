import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MetodoPago {
  ID_Metodo: string;
  Metodo: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  private apiUrl = 'http://localhost:3000/api/metodos_pago';

  constructor(private http: HttpClient) { }

  getMetodos(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.apiUrl);
  }

  getMetodo(id: string): Observable<MetodoPago> {
    return this.http.get<MetodoPago>(`${this.apiUrl}/${id}`);
  }

  createMetodo(metodo: MetodoPago): Observable<any> {
    return this.http.post(this.apiUrl, metodo);
  }

  updateMetodo(id: string, metodo: MetodoPago): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, metodo);
  }

  deleteMetodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
