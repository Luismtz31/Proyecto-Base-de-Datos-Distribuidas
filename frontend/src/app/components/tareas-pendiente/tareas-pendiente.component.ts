import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';
@Component({
  selector: 'app-tareas-pendientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container my-4">
      <h2 class="mb-4">Tareas Pendientes</h2>
      <div class="table-responsive">
        <table class="table table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Asignado A</th>
              <th>Fecha Límite</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let tarea of tareas">
              <td>{{ tarea.ID_Tarea }}</td>
              <td>{{ tarea.Descripcion }}</td>
              <td>{{ tarea.Asignado_A }}</td>
              <td>{{ tarea.Fecha_Limite }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1" (click)="editar(tarea)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="eliminar(tarea.ID_Tarea)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Botón flotante para mostrar/ocultar el formulario -->
      <button class="btn btn-success rounded-circle shadow position-fixed bottom-0 end-0 m-4" style="width:60px; height:60px; font-size:2rem; z-index:1050;" (click)="mostrarFormulario = !mostrarFormulario" title="Agregar tarea">
        <span *ngIf="!mostrarFormulario">+</span>
        <span *ngIf="mostrarFormulario">&times;</span>
      </button>
      <!-- Formulario colapsable -->
      <div class="collapse show" [class.show]="mostrarFormulario" style="transition: all 0.3s;">
        <div class="card shadow-lg mx-auto mt-5 mb-3 border border-primary bg-light" style="max-width: 600px;">
          <div class="card-header bg-dark text-white">
            <h4 class="mb-0">Agregar Tarea</h4>
          </div>
          <div class="card-body">
            <form class="row g-3 align-items-end" (ngSubmit)="agregar()" autocomplete="off">
              <div class="col-md-2">
                <input [(ngModel)]="nuevaTarea.ID_Tarea" name="idTarea" class="form-control" placeholder="ID Tarea" maxlength="6" required />
              </div>
              <div class="col-md-4">
                <input [(ngModel)]="nuevaTarea.Descripcion" name="descripcion" class="form-control" placeholder="Descripción" required />
              </div>
              <div class="col-md-3">
                <input [(ngModel)]="nuevaTarea.Asignado_A" name="asignadoA" class="form-control" placeholder="Asignado A (ID Empleado)" maxlength="6" required />
              </div>
              <div class="col-md-3">
                <input [(ngModel)]="nuevaTarea.Fecha_Limite" name="fechaLimite" class="form-control" placeholder="Fecha Límite (YYYY-MM-DD)" required />
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
export class TareasPendientesComponent implements OnInit {
  tareas: any[] = [];
  nuevaTarea: any = { ID_Tarea: '', Descripcion: '', Asignado_A: '', Fecha_Limite: '' };
  mostrarFormulario = false;
  editando = false;
  idEditando: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${environment.apiUrl}/tareas`).subscribe(data => {
      this.tareas = data;
    });
  }

  editar(tarea: any) {
    this.nuevaTarea = { ...tarea };
    this.editando = true;
    this.idEditando = tarea.ID_Tarea;
    this.mostrarFormulario = true;
  }

  agregar() {
    if (this.editando && this.idEditando) {
      this.http.put(`${environment.apiUrl}/tareas/${this.idEditando}`, this.nuevaTarea).subscribe(() => {
        this.nuevaTarea = { ID_Tarea: '', Descripcion: '', Asignado_A: '', Fecha_Limite: '' };
        this.cargar();
        this.editando = false;
        this.idEditando = null;
        this.mostrarFormulario = false;
      });
    } else {
      this.http.post(`${environment.apiUrl}/tareas`, this.nuevaTarea).subscribe(() => {
        this.nuevaTarea = { ID_Tarea: '', Descripcion: '', Asignado_A: '', Fecha_Limite: '' };
        this.cargar();
        this.mostrarFormulario = false;
      });
    }
  }

  eliminar(id: string) {
    this.http.delete(`${environment.apiUrl}/tareas/${id}`).subscribe(() => this.cargar());
  }
}
