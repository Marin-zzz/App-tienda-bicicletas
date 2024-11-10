import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarTrabajadorPage } from './agregar-trabajador.page';

describe('AgregarTrabajadorPage', () => {
  let component: AgregarTrabajadorPage;
  let fixture: ComponentFixture<AgregarTrabajadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTrabajadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
