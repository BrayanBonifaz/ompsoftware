import { TestBed, inject } from '@angular/core/testing';

import { ListLotesService } from './list-lotes.service';

describe('ListLotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListLotesService]
    });
  });

  it('should be created', inject([ListLotesService], (service: ListLotesService) => {
    expect(service).toBeTruthy();
  }));
});
