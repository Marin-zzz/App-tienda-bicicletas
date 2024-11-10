import { TestBed } from '@angular/core/testing';

import { GuiasDespachoService } from './guias-despacho.service';

describe('GuiasDespachoService', () => {
  let service: GuiasDespachoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuiasDespachoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
