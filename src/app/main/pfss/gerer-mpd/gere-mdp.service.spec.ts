import { TestBed } from '@angular/core/testing';

import { GereMdpService } from './gere-mdp.service';

describe('GereMdpService', () => {
  let service: GereMdpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GereMdpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
