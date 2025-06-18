// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { DetallesVentaComponent } from './components/detalles-venta/detalles-venta.component';
import { TareasPendientesComponent } from './components/tareas-pendiente/tareas-pendiente.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: AppComponent },
  { path: 'metodos-pago', component: MetodoPagoComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'ventas', component: VentasComponent},
  { path: 'detalles-venta', component: DetallesVentaComponent},
  { path: 'tareas-pendiente', component: TareasPendientesComponent},
];
