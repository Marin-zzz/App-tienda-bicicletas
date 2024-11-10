import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarGuiasPage } from './listar-guias.page';

describe('ListarGuiasPage', () => {
  let component: ListarGuiasPage;
  let fixture: ComponentFixture<ListarGuiasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarGuiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
