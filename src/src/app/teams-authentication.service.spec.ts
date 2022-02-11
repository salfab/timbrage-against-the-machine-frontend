import { TestBed } from '@angular/core/testing';

import { TeamsAuthenticationService } from './teams-authentication.service';

describe('TeamsAuthenticationService', () => {
  let service: TeamsAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
