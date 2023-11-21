import { TestBed } from '@angular/core/testing';

import { CalculateAgePipeService } from './calculate-age-pipe.service';

describe('CalculateAgePipeService', () => {
  let service: CalculateAgePipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateAgePipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
