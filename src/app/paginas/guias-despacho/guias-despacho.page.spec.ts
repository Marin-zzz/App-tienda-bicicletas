import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiasDespachoPage } from './guias-despacho.page';

describe('GuiasDespachoPage', () => {
  let component: GuiasDespachoPage;
  let fixture: ComponentFixture<GuiasDespachoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiasDespachoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
