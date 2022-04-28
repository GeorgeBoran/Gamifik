import { TestBed } from '@angular/core/testing';

import { RakingService } from './raking.service';

describe('RakingService', () => {
  let service: RakingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RakingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
