import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarGuiaPage } from './validar-guia.page';

describe('ValidarGuiaPage', () => {
  let component: ValidarGuiaPage;
  let fixture: ComponentFixture<ValidarGuiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarGuiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
