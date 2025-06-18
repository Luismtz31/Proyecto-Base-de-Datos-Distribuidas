import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';
@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container my-4">
      <h2 class="mb-4">Ventas</h2>

      <!-- Botones para elegir vista -->
      <div class="mb-3">
        <button class="btn btn-outline-primary me-2" (click)="cargar()">Todos</button>
        <button class="btn btn-outline-secondary me-2" (click)="cargarFragmento(1)">Fragmento 1</button>
        <button class="btn btn-outline-secondary" (click)="cargarFragmento(2)">Fragmento 2</button>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th>ID Venta</th>
              <th>ID Cliente</th>
              <th>Fecha Compra</th>
              <th>Método Pago</th>
              <th>Total Productos</th>
              <th>Subtotal</th>
              <th>Impuesto</th>
              <th>Descuento Total</th>
              <th>Total Pagar</th>
              <th>Estado</th>
              <th>Fecha Entrega</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let venta of ventas">
              <td>{{ venta.ID_Venta }}</td>
              <td>{{ venta.ID_Cliente }}</td>
              <td>{{ venta.Fecha_Compra }}</td>
              <td>{{ venta.Metodo_Pago }}</td>
              <td>{{ venta.Total_Productos }}</td>
              <td>{{ venta.Subtotal }}</td>
              <td>{{ venta.Impuesto }}</td>
              <td>{{ venta.Descuento_Total }}</td>
              <td>{{ venta.Total_Pagar }}</td>
              <td>{{ venta.Estado }}</td>
              <td>{{ venta.Fecha_Entrega }}</td>
              <td>{{ venta.Observaciones }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1" (click)="editar(venta)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="eliminar(venta.ID_Venta)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Botón flotante para mostrar/ocultar el formulario -->
      <button class="btn btn-success rounded-circle shadow position-fixed bottom-0 end-0 m-4" style="width:60px; height:60px; font-size:2rem; z-index:1050;" (click)="mostrarFormulario = !mostrarFormulario" title="Agregar venta">
        <span *ngIf="!mostrarFormulario">+</span>
        <span *ngIf="mostrarFormulario">&times;</span>
      </button>
      <!-- Formulario colapsable -->
      <div class="collapse show" [class.show]="mostrarFormulario" style="transition: all 0.3s;">
        <div class="card shadow-lg mx-auto mt-5 mb-3 border border-primary bg-light" style="max-width: 600px;">
          <div class="card-header bg-dark text-white">
            <h4 class="mb-0">Agregar Venta</h4>
          </div>
          <div class="card-body">
            <form class="row g-3 align-items-end" (ngSubmit)="agregar()" autocomplete="off">
              <div class="col-md-2">
                <input [(ngModel)]="nuevaVenta.ID_Venta" name="idVenta" class="form-control" placeholder="ID Venta" maxlength="8" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevaVenta.ID_Cliente" name="idCliente" class="form-control" placeholder="ID Cliente" maxlength="8" required />
              </div>
              <div class="col-md-3">
                <input [(ngModel)]="nuevaVenta.Fecha_Compra" name="fechaCompra" class="form-control" placeholder="Fecha Compra (YYYY-MM-DD HH:MM:SS)" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevaVenta.Metodo_Pago" name="metodoPago" class="form-control" placeholder="Método Pago" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevaVenta.Total_Productos" name="totalProductos" class="form-control" placeholder="Total Productos" type="number" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevaVenta.Subtotal" name="subtotal" class="form-control" placeholder="Subtotal" type="number" step="0.01" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevaVenta.Impuesto" name="impuesto" class="form-control" placeholder="Impuesto" type="number" step="0.01" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevaVenta.Descuento_Total" name="descuentoTotal" class="form-control" placeholder="Descuento Total" type="number" step="0.01" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevaVenta.Total_Pagar" name="totalPagar" class="form-control" placeholder="Total Pagar" type="number" step="0.01" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevaVenta.Estado" name="estado" class="form-control" placeholder="Estado" required />
              </div>
              <div class="col-md-3">
                <input [(ngModel)]="nuevaVenta.Fecha_Entrega" name="fechaEntrega" class="form-control" placeholder="Fecha Entrega (YYYY-MM-DD HH:MM:SS)" required />
              </div>
              <div class="col-md-3">
                <input [(ngModel)]="nuevaVenta.Observaciones" name="observaciones" class="form-control" placeholder="Observaciones" />
              </div>
              <div class="col-12 d-flex justify-content-end">
                <button type="submit" class="btn btn-dark">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class VentasComponent implements OnInit {
  ventas: any[] = [];
  nuevaVenta: any = {
    ID_Venta: '',
    ID_Cliente: '',
    Fecha_Compra: '',
    Metodo_Pago: '',
    Total_Productos: '',
    Subtotal: '',
    Impuesto: '',
    Descuento_Total: '',
    Total_Pagar: '',
    Estado: '',
    Fecha_Entrega: '',
    Observaciones: ''
  };
  mostrarFormulario = false;
  editando = false;
  idEditando: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${environment.apiUrl}/ventas`).subscribe(data => {
      this.ventas = data;
    });
  }

  agregar() {
    if (this.editando && this.idEditando) {
      this.http.put(`${environment.apiUrl}/ventas/${this.idEditando}`, this.nuevaVenta).subscribe(() => {
        this.nuevaVenta = {
          ID_Venta: '', ID_Cliente: '', Fecha_Compra: '', Metodo_Pago: '', Total_Productos: '', Subtotal: '', Impuesto: '', Descuento_Total: '', Total_Pagar: '', Estado: '', Fecha_Entrega: '', Observaciones: ''
        };
        this.cargar();
        this.editando = false;
        this.idEditando = null;
        this.mostrarFormulario = false;
      });
    } else {
      this.http.post(`${environment.apiUrl}/ventas`, this.nuevaVenta).subscribe(() => {
        this.nuevaVenta = {
          ID_Venta: '', ID_Cliente: '', Fecha_Compra: '', Metodo_Pago: '', Total_Productos: '', Subtotal: '', Impuesto: '', Descuento_Total: '', Total_Pagar: '', Estado: '', Fecha_Entrega: '', Observaciones: ''
        };
        this.cargar();
        this.mostrarFormulario = false;
      });
    }
  }

  eliminar(id: string) {
    this.http.delete(`${environment.apiUrl}/ventas/${id}`).subscribe(() => this.cargar());
  }

  cargarFragmento(numero: number) {
    const url = `${environment.apiUrl}/ventas/fragmento${numero}`;
    this.http.get<any[]>(url).subscribe(data => {
      this.ventas = data;
    });
  }

  editar(venta: any) {
    this.nuevaVenta = { ...venta };
    this.editando = true;
    this.idEditando = venta.ID_Venta;
    this.mostrarFormulario = true;
  }
}