import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarBoletasPage } from './listar-boletas.page';

describe('ListarBoletasPage', () => {
  let component: ListarBoletasPage;
  let fixture: ComponentFixture<ListarBoletasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBoletasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
