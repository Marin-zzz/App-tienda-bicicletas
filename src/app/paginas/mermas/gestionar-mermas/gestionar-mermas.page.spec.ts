import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionarMermasPage } from './gestionar-mermas.page';

describe('GestionarMermasPage', () => {
  let component: GestionarMermasPage;
  let fixture: ComponentFixture<GestionarMermasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarMermasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
