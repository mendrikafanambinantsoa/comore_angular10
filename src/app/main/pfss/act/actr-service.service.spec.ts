import { TestBed } from '@angular/core/testing';

import { ActrServiceService } from './actr-service.service';

describe('ActrServiceService', () => {
  let service: ActrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
