// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div *ngIf="isHome; else mainApp" class="d-flex flex-column align-items-center justify-content-center" style="min-height: 80vh;">
      <h1>Bienvenido a StoreManager</h1>
      <button class="btn btn-primary mt-4" (click)="showMenu = !showMenu">{{ showMenu ? 'Ocultar' : 'Mostrar' }} menú</button>
      <div *ngIf="showMenu" class="mt-3">
        <ng-container *ngTemplateOutlet="menu"></ng-container>
      </div>
    </div>
    <ng-template #mainApp>
      <ng-container *ngTemplateOutlet="menu"></ng-container>
      <hr />
      <router-outlet></router-outlet>
    </ng-template>
    <ng-template #menu>
      <nav class="mb-3">
        <a routerLink="/metodos-pago" class="btn btn-outline-primary btn-sm mx-1">Métodos de Pago</a>
        <a routerLink="/proveedores" class="btn btn-outline-primary btn-sm mx-1">Proveedores</a>
        <a routerLink="/clientes" class="btn btn-outline-primary btn-sm mx-1">Clientes</a>
        <a routerLink="/productos" class="btn btn-outline-primary btn-sm mx-1">Productos</a>
        <a routerLink="/empleados" class="btn btn-outline-primary btn-sm mx-1">Empleados</a>
        <a routerLink="/tareas-pendiente" class="btn btn-outline-primary btn-sm mx-1">Tareas</a>
        <a routerLink="/ventas" class="btn btn-outline-primary btn-sm mx-1">Ventas</a>
        <a routerLink="/detalles-venta" class="btn btn-outline-primary btn-sm mx-1">Detalles de venta</a>
      </nav>
    </ng-template>
  `
})
export class AppComponent {
  showMenu = false;
  isHome = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.url === '/';
        if (!this.isHome) this.showMenu = false;
      }
    });
  }
}
