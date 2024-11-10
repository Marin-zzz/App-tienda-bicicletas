import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilTrabajadorPage } from './perfil-trabajador.page';

describe('PerfilTrabajadorPage', () => {
  let component: PerfilTrabajadorPage;
  let fixture: ComponentFixture<PerfilTrabajadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilTrabajadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
