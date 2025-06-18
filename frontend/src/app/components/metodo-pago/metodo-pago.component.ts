import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../enviroments/enviroment';

interface MetodoPago {
  ID_Metodo: string;
  Metodo: string;
}

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container my-4">
      <h2 class="mb-4">Métodos de Pago</h2>
      <div class="table-responsive">
        <table class="table table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Método</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let metodo of metodosPago">
              <td>{{ metodo.ID_Metodo }}</td>
              <td>{{ metodo.Metodo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class MetodoPagoComponent {
  metodosPago: MetodoPago[] = [];
  apiUrl = `${environment.apiUrl}/metodos_pago`;

  constructor(private http: HttpClient) {
    this.cargarMetodos();
  }

  cargarMetodos() {
    this.http.get<MetodoPago[]>(this.apiUrl).subscribe(data => {
      this.metodosPago = data;
    });
  }
}
