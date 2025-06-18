import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container my-4">
      <h2 class="mb-4">Clientes</h2>

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
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Método de Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cliente of clientes">
              <td>{{ cliente.ID_Cliente }}</td>
              <td>{{ cliente.Nombre }}</td>
              <td>{{ cliente.Correo }}</td>
              <td>{{ cliente.Telefono }}</td>
              <td>{{ cliente.Direccion }}</td>
              <td>{{ cliente.Metodo_Pago_ID }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1" (click)="editar(cliente)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="eliminar(cliente.ID_Cliente)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Botón flotante para mostrar/ocultar el formulario -->
      <button class="btn btn-success rounded-circle shadow position-fixed bottom-0 end-0 m-4" style="width:60px; height:60px; font-size:2rem; z-index:1050;" (click)="mostrarFormulario = !mostrarFormulario" title="Agregar cliente">
        <span *ngIf="!mostrarFormulario">+</span>
        <span *ngIf="mostrarFormulario">&times;</span>
      </button>
      <!-- Formulario colapsable -->
      <div class="collapse show" [class.show]="mostrarFormulario" style="transition: all 0.3s;">
        <div class="card shadow-lg mx-auto mt-5 mb-3 border border-primary bg-light" style="max-width: 600px;">
          <div class="card-header bg-dark text-white">
            <h4 class="mb-0">Agregar Cliente</h4>
          </div>
          <div class="card-body">
            <form class="row g-3 align-items-end" (ngSubmit)="agregar()" autocomplete="off">
              <div class="col-md-2">
                <input [(ngModel)]="nuevoCliente.ID_Cliente" name="idCliente" class="form-control" placeholder="ID" maxlength="8" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevoCliente.Nombre" name="nombre" class="form-control" placeholder="Nombre" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevoCliente.Correo" name="correo" class="form-control" placeholder="Correo" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevoCliente.Telefono" name="telefono" class="form-control" placeholder="Teléfono" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevoCliente.Direccion" name="direccion" class="form-control" placeholder="Dirección" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevoCliente.Metodo_Pago_ID" name="metodoPago" class="form-control" placeholder="Método de Pago ID" maxlength="6" required />
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
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  nuevoCliente: any = {
    ID_Cliente: '',
    Nombre: '',
    Correo: '',
    Telefono: '',
    Direccion: '',
    Metodo_Pago_ID: ''
  };
  mostrarFormulario = false;
  editando = false;
  idEditando: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${environment.apiUrl}/clientes`).subscribe(data => {
      this.clientes = data;
    });
  }

  cargarFragmento(numero: number) {
    const url = `${environment.apiUrl}/clientes/fragmento${numero}`;
    this.http.get<any[]>(url).subscribe(data => {
      this.clientes = data;
    });
  }

  editar(cliente: any) {
    this.nuevoCliente = { ...cliente };
    this.editando = true;
    this.idEditando = cliente.ID_Cliente;
    this.mostrarFormulario = true;
  }

  agregar() {
    if (this.editando && this.idEditando) {
      this.http.put(`${environment.apiUrl}/clientes/${this.idEditando}`, this.nuevoCliente).subscribe(() => {
        this.nuevoCliente = {
          ID_Cliente: '', Nombre: '', Correo: '', Telefono: '', Direccion: '', Metodo_Pago_ID: ''
        };
        this.cargar();
        this.editando = false;
        this.idEditando = null;
        this.mostrarFormulario = false;
      });
    } else {
      this.http.post(`${environment.apiUrl}/clientes`, this.nuevoCliente).subscribe(() => {
        this.nuevoCliente = {
          ID_Cliente: '', Nombre: '', Correo: '', Telefono: '', Direccion: '', Metodo_Pago_ID: ''
        };
        this.cargar();
        this.mostrarFormulario = false;
      });
    }
  }

  eliminar(id: string) {
    this.http.delete(`${environment.apiUrl}/clientes/${id}`).subscribe(() => this.cargar());
  }
}
