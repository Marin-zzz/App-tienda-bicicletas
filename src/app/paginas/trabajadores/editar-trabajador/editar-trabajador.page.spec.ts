import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTrabajadorPage } from './editar-trabajador.page';

describe('EditarTrabajadorPage', () => {
  let component: EditarTrabajadorPage;
  let fixture: ComponentFixture<EditarTrabajadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTrabajadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
