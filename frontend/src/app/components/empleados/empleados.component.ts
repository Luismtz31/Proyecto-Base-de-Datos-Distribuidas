import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container my-4">
      <h2 class="mb-4">Empleados</h2>
      <div class="table-responsive">
        <table class="table table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Horario Entrada</th>
              <th>Horario Salida</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let empleado of empleados">
              <td>{{ empleado.ID_Empleado }}</td>
              <td>{{ empleado.Nombre }}</td>
              <td>{{ empleado.Cargo }}</td>
              <td>{{ empleado.Horario_Entrada }}</td>
              <td>{{ empleado.Horario_Salida }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1" (click)="editar(empleado)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="eliminar(empleado.ID_Empleado)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Botón flotante para mostrar/ocultar el formulario -->
      <button class="btn btn-success rounded-circle shadow position-fixed bottom-0 end-0 m-4" style="width:60px; height:60px; font-size:2rem; z-index:1050;" (click)="mostrarFormulario = !mostrarFormulario" title="Agregar empleado">
        <span *ngIf="!mostrarFormulario">+</span>
        <span *ngIf="mostrarFormulario">&times;</span>
      </button>
      <!-- Formulario colapsable -->
      <div class="collapse show" [class.show]="mostrarFormulario" style="transition: all 0.3s;">
        <div class="card shadow-lg mx-auto mt-5 mb-3 border border-primary bg-light" style="max-width: 600px;">
          <div class="card-header bg-dark text-white">
            <h4 class="mb-0">Agregar Empleado</h4>
          </div>
          <div class="card-body">
            <form class="row g-3 align-items-end" (ngSubmit)="agregar()" autocomplete="off">
              <div class="col-md-2">
                <input [(ngModel)]="nuevoEmpleado.ID_Empleado" name="idEmpleado" class="form-control" placeholder="ID Empleado" maxlength="6" required />
              </div>
              <div class="col-md-3">
                <input [(ngModel)]="nuevoEmpleado.Nombre" name="nombre" class="form-control" placeholder="Nombre" required />
              </div>
              <div class="col-md-3">
                <input [(ngModel)]="nuevoEmpleado.Cargo" name="cargo" class="form-control" placeholder="Cargo" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevoEmpleado.Horario_Entrada" name="entrada" class="form-control" placeholder="Horario Entrada (HH:MM:SS)" required />
              </div>
              <div class="col-md-2">
                <input [(ngModel)]="nuevoEmpleado.Horario_Salida" name="salida" class="form-control" placeholder="Horario Salida (HH:MM:SS)" required />
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
export class EmpleadosComponent implements OnInit { 
  empleados: any[] = [];
  nuevoEmpleado: any = { 
    ID_Empleado: '', 
    Nombre: '', 
    Cargo: '', 
    Horario_Entrada: '', 
    Horario_Salida: '' 
  };
  mostrarFormulario = false;
  editando = false;
  idEditando: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${environment.apiUrl}/empleados`).subscribe(data => {
      this.empleados = data;
    });
  }

  editar(empleado: any) {
    this.nuevoEmpleado = { ...empleado };
    this.editando = true;
    this.idEditando = empleado.ID_Empleado;
    this.mostrarFormulario = true;
  }

  agregar() {
    if (this.editando && this.idEditando) {
      this.http.put(`${environment.apiUrl}/empleados/${this.idEditando}`, this.nuevoEmpleado).subscribe(() => {
        this.nuevoEmpleado = { ID_Empleado: '', Nombre: '', Cargo: '', Horario_Entrada: '', Horario_Salida: '' };
        this.cargar();
        this.editando = false;
        this.idEditando = null;
        this.mostrarFormulario = false;
      });
    } else {
      this.http.post(`${environment.apiUrl}/empleados`, this.nuevoEmpleado).subscribe(() => {
        this.nuevoEmpleado = { ID_Empleado: '', Nombre: '', Cargo: '', Horario_Entrada: '', Horario_Salida: '' };
        this.cargar();
        this.mostrarFormulario = false;
      });
    }
  }

  eliminar(id: string) {
      this.http.delete(`${environment.apiUrl}/empleados/${id}`).subscribe(() => this.cargar());
  }
}
