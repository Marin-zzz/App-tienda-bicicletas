import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarGuiaPage } from './generar-guia.page';

describe('GenerarGuiaPage', () => {
  let component: GenerarGuiaPage;
  let fixture: ComponentFixture<GenerarGuiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarGuiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
