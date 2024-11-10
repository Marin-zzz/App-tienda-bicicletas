import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarMermasPage } from './listar-mermas.page';

describe('ListarMermasPage', () => {
  let component: ListarMermasPage;
  let fixture: ComponentFixture<ListarMermasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMermasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
