import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviarMermaPage } from './enviar-merma.page';

describe('EnviarMermaPage', () => {
  let component: EnviarMermaPage;
  let fixture: ComponentFixture<EnviarMermaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarMermaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
