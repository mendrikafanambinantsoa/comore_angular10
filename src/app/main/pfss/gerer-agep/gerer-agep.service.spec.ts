import { TestBed } from '@angular/core/testing';

import { GererAgepService } from './gerer-agep.service';

describe('GererAgepService', () => {
  let service: GererAgepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererAgepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
