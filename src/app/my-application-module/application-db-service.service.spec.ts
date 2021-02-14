import { TestBed } from '@angular/core/testing';

import { ApplicationDbServiceService } from './application-db-service.service';

describe('ApplicationDbServiceService', () => {
  let service: ApplicationDbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationDbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
