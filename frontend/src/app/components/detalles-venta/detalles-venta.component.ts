import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-detalles-venta',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container my-4">
      <h2 class="mb-4">Detalles de Venta</h2>

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
              <th>ID Detalle</th>
              <th>ID Venta</th>
              <th>ID Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Descuento</th>
              <th>Subtotal</th>
              <th>Impuesto</th>
              <th>Total</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let detalle of detalles">
              <td>{{ detalle.ID_Detalle }}</td>
              <td>{{ detalle.ID_Venta }}</td>
              <td>{{ detalle.ID_Producto }}</td>
              <td>{{ detalle.Cantidad }}</td>
              <td>{{ detalle.Precio_Unitario }}</td>
              <td>{{ detalle.Descuento }}</td>
              <td>{{ detalle.Subtotal }}</td>
              <td>{{ detalle.Impuesto }}</td>
              <td>{{ detalle.Total }}</td>
              <td>{{ detalle.Fecha_Registro }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1" (click)="editar(detalle)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="eliminar(detalle.ID_Detalle)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 class="mt-5 mb-3">Agregar Detalle de Venta</h3>
      <form class="row g-3 align-items-end" (ngSubmit)="agregar()" autocomplete="off">
        <div class="col-md-2">
          <input [(ngModel)]="nuevoDetalle.ID_Detalle" name="idDetalle" class="form-control" placeholder="ID Detalle" maxlength="10" required />
        </div>
        <div class="col-md-2">
          <input [(ngModel)]="nuevoDetalle.ID_Venta" name="idVenta" class="form-control" placeholder="ID Venta" maxlength="8" required />
        </div>
        <div class="col-md-2">
          <input [(ngModel)]="nuevoDetalle.ID_Producto" name="idProducto" class="form-control" placeholder="ID Producto" maxlength="8" required />
        </div>
        <div class="col-md-1">
          <input [(ngModel)]="nuevoDetalle.Cantidad" name="cantidad" class="form-control" placeholder="Cantidad" type="number" required />
        </div>
        <div class="col-md-2">
          <input [(ngModel)]="nuevoDetalle.Precio_Unitario" name="precioUnitario" class="form-control" placeholder="Precio Unitario" type="number" step="0.01" required />
        </div>
        <div class="col-md-1">
          <input [(ngModel)]="nuevoDetalle.Descuento" name="descuento" class="form-control" placeholder="Descuento" type="number" step="0.01" required />
        </div>
        <div class="col-md-1">
          <input [(ngModel)]="nuevoDetalle.Subtotal" name="subtotal" class="form-control" placeholder="Subtotal" type="number" step="0.01" required />
        </div>
        <div class="col-md-1">
          <input [(ngModel)]="nuevoDetalle.Impuesto" name="impuesto" class="form-control" placeholder="Impuesto" type="number" step="0.01" required />
        </div>
        <div class="col-md-1">
          <input [(ngModel)]="nuevoDetalle.Total" name="total" class="form-control" placeholder="Total" type="number" step="0.01" required />
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevoDetalle.Fecha_Registro" name="fechaRegistro" class="form-control" placeholder="Fecha Registro (YYYY-MM-DD HH:MM:SS)" required />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Actualizar</button>
        </div>
      </form>
    </div>
  `
})
export class DetallesVentaComponent implements OnInit {
  detalles: any[] = [];
  nuevoDetalle: any = {
    ID_Detalle: '',
    ID_Venta: '',
    ID_Producto: '',
    Cantidad: '',
    Precio_Unitario: '',
    Descuento: '',
    Subtotal: '',
    Impuesto: '',
    Total: '',
    Fecha_Registro: ''
  };
  editando = false;
  idEditando: string | null = null;
  mostrarFormulario = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${environment.apiUrl}/detalles`).subscribe(data => {
      this.detalles = data;
    });
  }

  agregar() {
    if (this.editando && this.idEditando) {
      this.http.put(`${environment.apiUrl}/detalles/${this.idEditando}`, this.nuevoDetalle).subscribe(() => {
        this.nuevoDetalle = {
          ID_Detalle: '', ID_Venta: '', ID_Producto: '', Cantidad: '', Precio_Unitario: '', Descuento: '', Subtotal: '', Impuesto: '', Total: '', Fecha_Registro: ''
        };
        this.cargar();
        this.editando = false;
        this.idEditando = null;
        this.mostrarFormulario = false;
      });
    } else {
      this.http.post(`${environment.apiUrl}/detalles`, this.nuevoDetalle).subscribe(() => {
        this.nuevoDetalle = {
          ID_Detalle: '', ID_Venta: '', ID_Producto: '', Cantidad: '', Precio_Unitario: '', Descuento: '', Subtotal: '', Impuesto: '', Total: '', Fecha_Registro: ''
        };
        this.cargar();
        this.mostrarFormulario = false;
      });
    }
  }

  eliminar(id: string) {
    this.http.delete(`${environment.apiUrl}/detalles/${id}`).subscribe(() => this.cargar());
  }

  cargarFragmento(numero: number) {
    const url = `${environment.apiUrl}/detalles/fragmento${numero}`;
    this.http.get<any[]>(url).subscribe(data => {
      this.detalles = data;
    });
  }

  editar(detalle: any) {
    this.nuevoDetalle = { ...detalle };
    this.editando = true;
    this.idEditando = detalle.ID_Detalle;
    this.mostrarFormulario = true;
  }
}
