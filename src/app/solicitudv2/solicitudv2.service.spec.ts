import { TestBed, inject } from '@angular/core/testing';

import { Solicitudv2Service } from './solicitudv2.service';

describe('Solicitudv2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Solicitudv2Service]
    });
  });

  it('should be created', inject([Solicitudv2Service], (service: Solicitudv2Service) => {
    expect(service).toBeTruthy();
  }));
});
