import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleBoletaPage } from './detalle-boleta.page';

describe('DetalleBoletaPage', () => {
  let component: DetalleBoletaPage;
  let fixture: ComponentFixture<DetalleBoletaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBoletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
