import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleGuiaPage } from './detalle-guia.page';

describe('DetalleGuiaPage', () => {
  let component: DetalleGuiaPage;
  let fixture: ComponentFixture<DetalleGuiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleGuiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
