import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarTrabajadoresPage } from './listar-trabajadores.page';

describe('ListarTrabajadoresPage', () => {
  let component: ListarTrabajadoresPage;
  let fixture: ComponentFixture<ListarTrabajadoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTrabajadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
