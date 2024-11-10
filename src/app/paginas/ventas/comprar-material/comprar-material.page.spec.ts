import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprarMaterialPage } from './comprar-material.page';

describe('ComprarMaterialPage', () => {
  let component: ComprarMaterialPage;
  let fixture: ComponentFixture<ComprarMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
