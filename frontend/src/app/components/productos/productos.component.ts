import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container my-4">
      <h2 class="mb-4">Productos</h2>

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
              <th>Número Serie</th>
              <th>Descripción</th>
              <th>Unidad Medida</th>
              <th>Categoría</th>
              <th>SubCategoría</th>
              <th>Precio Mínimo</th>
              <th>Precio1</th>
              <th>Precio2</th>
              <th>Precio3</th>
              <th>Impuesto</th>
              <th>ID Proveedor 1</th>
              <th>ID Proveedor 2</th>
              <th>Stock Mínimo</th>
              <th>Stock Máximo</th>
              <th>Stock</th>
              <th>Costo Unitario</th>
              <th>Costo Promedio</th>
              <th>Método Costeo</th>
              <th>Ventas Totales</th>
              <th>Unidades Vendidas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let producto of productos">
              <td>{{ producto.ID_Producto }}</td>
              <td>{{ producto.Numero_Serie }}</td>
              <td>{{ producto.Descripcion }}</td>
              <td>{{ producto.Unidad_Medida }}</td>
              <td>{{ producto.Categoria }}</td>
              <td>{{ producto.SubCategoria }}</td>
              <td>{{ producto.Precio_Minimo }}</td>
              <td>{{ producto.Precio1 }}</td>
              <td>{{ producto.Precio2 }}</td>
              <td>{{ producto.Precio3 }}</td>
              <td>{{ producto.Impuesto }}</td>
              <td>{{ producto.ID_Proveedor1 }}</td>
              <td>{{ producto.ID_Proveedor2 }}</td>
              <td>{{ producto.Stock_Minimo }}</td>
              <td>{{ producto.Stock_Maximo }}</td>
              <td>{{ producto.Stock }}</td>
              <td>{{ producto.Costo_Unitario }}</td>
              <td>{{ producto.Costo_Promedio }}</td>
              <td>{{ producto.Metodo_Costeo }}</td>
              <td>{{ producto.Ventas_Totales }}</td>
              <td>{{ producto.Unidades_Vendidas }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1" (click)="editar(producto)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="eliminar(producto.ID_Producto)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Botón flotante para mostrar/ocultar el formulario -->
      <button class="btn btn-success rounded-circle shadow position-fixed bottom-0 end-0 m-4" style="width:60px; height:60px; font-size:2rem; z-index:1050;" (click)="mostrarFormulario = !mostrarFormulario" title="Agregar producto">
        <span *ngIf="!mostrarFormulario">+</span>
        <span *ngIf="mostrarFormulario">&times;</span>
      </button>
      <!-- Formulario colapsable -->
      <div class="collapse show" [class.show]="mostrarFormulario" style="transition: all 0.3s;">
        <div class="card shadow-lg mx-auto mt-5 mb-3 border border-primary bg-light" style="max-width: 600px;">
          <div class="card-header bg-dark text-white">
            <h4 class="mb-0">Agregar Producto</h4>
          </div>
          <div class="card-body">
            <form class="row g-3 align-items-end" (ngSubmit)="agregar()" autocomplete="off">
              <div class="col-md-2" *ngFor="let field of campos">
                <input [(ngModel)]="nuevoProducto[field.key]" [name]="field.key" [type]="field.type" class="form-control mb-2" [placeholder]="field.label" [required]="field.required" [attr.maxlength]="field.maxlength != null ? field.maxlength : null" [value]="nuevoProducto[field.key] ?? ''" />
              </div>
              <div class="col-md-2">
                <select [(ngModel)]="nuevoProducto.Metodo_Costeo" name="metodoCosteo" class="form-control mb-2" required>
                  <option value="Promedio">Promedio</option>
                  <option value="Ultimo">Ultimo</option>
                  <option value="FIFO">FIFO</option>
                </select>
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
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  nuevoProducto: any = {
    ID_Producto: '', Numero_Serie: '', Descripcion: '', Unidad_Medida: '', Categoria: '', SubCategoria: '', Precio_Minimo: 0, Precio1: 0, Precio2: 0, Precio3: 0, Impuesto: 0, ID_Proveedor1: '', ID_Proveedor2: '', Stock_Minimo: 0, Stock_Maximo: 0, Stock: 0, Costo_Unitario: 0, Costo_Promedio: 0, Metodo_Costeo: 'Promedio', Ventas_Totales: 0, Unidades_Vendidas: 0
  };
  campos = [
    { key: 'ID_Producto', label: 'ID', type: 'text', required: true, maxlength: 8 },
    { key: 'Numero_Serie', label: 'Número Serie', type: 'text', required: true },
    { key: 'Descripcion', label: 'Descripción', type: 'text', required: true },
    { key: 'Unidad_Medida', label: 'Unidad Medida', type: 'text', required: true },
    { key: 'Categoria', label: 'Categoría', type: 'text', required: true },
    { key: 'SubCategoria', label: 'SubCategoría', type: 'text', required: true },
    { key: 'Precio_Minimo', label: 'Precio Mínimo', type: 'number', required: true },
    { key: 'Precio1', label: 'Precio1', type: 'number', required: true },
    { key: 'Precio2', label: 'Precio2', type: 'number', required: true },
    { key: 'Precio3', label: 'Precio3', type: 'number', required: true },
    { key: 'Impuesto', label: 'Impuesto', type: 'number', required: true },
    { key: 'ID_Proveedor1', label: 'ID Proveedor 1', type: 'text', required: true, maxlength: 6 },
    { key: 'ID_Proveedor2', label: 'ID Proveedor 2', type: 'text', required: true, maxlength: 6 },
    { key: 'Stock_Minimo', label: 'Stock Mínimo', type: 'number', required: true },
    { key: 'Stock_Maximo', label: 'Stock Máximo', type: 'number', required: true },
    { key: 'Stock', label: 'Stock', type: 'number', required: true },
    { key: 'Costo_Unitario', label: 'Costo Unitario', type: 'number', required: true },
    { key: 'Costo_Promedio', label: 'Costo Promedio', type: 'number', required: true },
    { key: 'Ventas_Totales', label: 'Ventas Totales', type: 'number', required: true },
    { key: 'Unidades_Vendidas', label: 'Unidades Vendidas', type: 'number', required: true }
  ];
  mostrarFormulario = false;
  editando = false;
  idEditando: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${environment.apiUrl}/productos`).subscribe(data => {
      this.productos = data;
    });
  }

  editar(producto: any) {
    this.nuevoProducto = { ...producto };
    this.editando = true;
    this.idEditando = producto.ID_Producto;
    this.mostrarFormulario = true;
  }

  agregar() {
    if (this.editando && this.idEditando) {
      this.http.put(`${environment.apiUrl}/productos/${this.idEditando}`, this.nuevoProducto).subscribe(() => {
        this.nuevoProducto = {
          ID_Producto: '', Numero_Serie: '', Descripcion: '', Unidad_Medida: '', Categoria: '', SubCategoria: '', Precio_Minimo: 0, Precio1: 0, Precio2: 0, Precio3: 0, Impuesto: 0, ID_Proveedor1: '', ID_Proveedor2: '', Stock_Minimo: 0, Stock_Maximo: 0, Stock: 0, Costo_Unitario: 0, Costo_Promedio: 0, Metodo_Costeo: 'Promedio', Ventas_Totales: 0, Unidades_Vendidas: 0
        };
        this.cargar();
        this.editando = false;
        this.idEditando = null;
        this.mostrarFormulario = false;
      });
    } else {
      this.http.post(`${environment.apiUrl}/productos`, this.nuevoProducto).subscribe(() => {
        this.nuevoProducto = {
          ID_Producto: '', Numero_Serie: '', Descripcion: '', Unidad_Medida: '', Categoria: '', SubCategoria: '', Precio_Minimo: 0, Precio1: 0, Precio2: 0, Precio3: 0, Impuesto: 0, ID_Proveedor1: '', ID_Proveedor2: '', Stock_Minimo: 0, Stock_Maximo: 0, Stock: 0, Costo_Unitario: 0, Costo_Promedio: 0, Metodo_Costeo: 'Promedio', Ventas_Totales: 0, Unidades_Vendidas: 0
        };
        this.cargar();
        this.mostrarFormulario = false;
      });
    }
  }

  eliminar(id: string) {
    this.http.delete(`${environment.apiUrl}/productos/${id}`).subscribe(() => this.cargar());
  }

  cargarFragmento(numero: number) {
    const url = `${environment.apiUrl}/productos/fragmento${numero}`;
    this.http.get<any[]>(url).subscribe(data => {
      this.productos = data;
    });
  }
}
