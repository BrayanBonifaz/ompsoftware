import { TestBed, inject } from '@angular/core/testing';

import { ListLoteService } from './list-lote.service';

describe('ListLoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListLoteService]
    });
  });

  it('should be created', inject([ListLoteService], (service: ListLoteService) => {
    expect(service).toBeTruthy();
  }));
});
