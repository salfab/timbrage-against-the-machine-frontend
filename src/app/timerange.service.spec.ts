import { TestBed } from '@angular/core/testing';

import { TimerangeService } from './timerange.service';

describe('TimerangeService', () => {
  let service: TimerangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
