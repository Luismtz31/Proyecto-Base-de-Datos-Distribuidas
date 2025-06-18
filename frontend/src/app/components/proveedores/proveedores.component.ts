import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';
@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container my-4 position-relative">
      <h2 class="mb-4">Proveedores</h2>
      <div class="table-responsive">
        <table class="table table-striped table-hover align-middle shadow-sm border border-primary bg-light">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let proveedor of proveedores">
              <td>{{ proveedor.ID_Proveedor }}</td>
              <td>{{ proveedor.Nombre }}</td>
              <td>{{ proveedor.Contacto }}</td>
              <td>{{ proveedor.Telefono }}</td>
              <td>{{ proveedor.Direccion }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1" (click)="editar(proveedor)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="eliminar(proveedor.ID_Proveedor)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Botón flotante para mostrar/ocultar el formulario -->
      <button class="btn btn-success rounded-circle shadow position-fixed bottom-0 end-0 m-4" style="width:60px; height:60px; font-size:2rem; z-index:1050;" (click)="mostrarFormulario = !mostrarFormulario" title="Agregar proveedor">
        <span *ngIf="!mostrarFormulario">+</span>
        <span *ngIf="mostrarFormulario">&times;</span>
      </button>
      <!-- Formulario colapsable -->
      <div class="collapse show" [class.show]="mostrarFormulario" style="transition: all 0.3s;">
        <div class="card shadow-lg mx-auto mt-5 mb-3 border border-primary bg-light" style="max-width: 600px;">
          <div class="card-header bg-dark text-white">
            <h4 class="mb-0">Agregar Proveedor</h4>
          </div>
          <div class="card-body">
            <form class="row g-3 align-items-end" (ngSubmit)="agregar()" autocomplete="off">
              <div class="col-md-4">
                <label class="form-label">ID</label>
                <input [(ngModel)]="nuevoProveedor.ID_Proveedor" name="idProveedor" class="form-control" placeholder="ID" maxlength="6" required />
              </div>
              <div class="col-md-8">
                <label class="form-label">Nombre</label>
                <input [(ngModel)]="nuevoProveedor.Nombre" name="nombre" class="form-control" placeholder="Nombre" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Contacto</label>
                <input [(ngModel)]="nuevoProveedor.Contacto" name="contacto" class="form-control" placeholder="Contacto" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Teléfono</label>
                <input [(ngModel)]="nuevoProveedor.Telefono" name="telefono" class="form-control" placeholder="Teléfono" required />
              </div>
              <div class="col-12">
                <label class="form-label">Dirección</label>
                <input [(ngModel)]="nuevoProveedor.Direccion" name="direccion" class="form-control" placeholder="Dirección" required />
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
export class ProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  nuevoProveedor: any = { ID_Proveedor: '', Nombre: '', Contacto: '', Telefono: '', Direccion: '' };
  mostrarFormulario = false;
  editando = false;
  idEditando: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${environment.apiUrl}/proveedores`).subscribe(data => {
      this.proveedores = data;
    });
  }

  editar(proveedor: any) {
    this.nuevoProveedor = { ...proveedor };
    this.editando = true;
    this.idEditando = proveedor.ID_Proveedor;
    this.mostrarFormulario = true;
  }

  agregar() {
    if (this.editando && this.idEditando) {
      this.http.put(`${environment.apiUrl}/proveedores/${this.idEditando}`, this.nuevoProveedor).subscribe(() => {
        this.nuevoProveedor = { ID_Proveedor: '', Nombre: '', Contacto: '', Telefono: '', Direccion: '' };
        this.cargar();
        this.editando = false;
        this.idEditando = null;
        this.mostrarFormulario = false;
      });
    } else {
      this.http.post(`${environment.apiUrl}/proveedores`, this.nuevoProveedor).subscribe(() => {
        this.nuevoProveedor = { ID_Proveedor: '', Nombre: '', Contacto: '', Telefono: '', Direccion: '' };
        this.cargar();
        this.mostrarFormulario = false;
      });
    }
  }

  eliminar(id: string) {
    this.http.delete(`${environment.apiUrl}/proveedores/${id}`).subscribe(() => this.cargar());
  }
}