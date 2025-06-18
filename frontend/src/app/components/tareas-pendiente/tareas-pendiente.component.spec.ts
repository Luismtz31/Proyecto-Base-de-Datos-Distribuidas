import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasPendienteComponent } from './tareas-pendiente.component';

describe('TareasPendienteComponent', () => {
  let component: TareasPendienteComponent;
  let fixture: ComponentFixture<TareasPendienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasPendienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareasPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
