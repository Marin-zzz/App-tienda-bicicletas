import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarEditarProductosPage } from './listar-editar-productos.page';

describe('ListarEditarProductosPage', () => {
  let component: ListarEditarProductosPage;
  let fixture: ComponentFixture<ListarEditarProductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEditarProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
