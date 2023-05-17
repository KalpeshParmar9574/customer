import { TestBed } from '@angular/core/testing';

import { PinsDataService } from './pins-data.service';

describe('PinsDataService', () => {
  let service: PinsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
