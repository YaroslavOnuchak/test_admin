import { TestBed } from '@angular/core/testing';

import { GooglesinginService } from './googlesingin.service';

describe('GooglesinginService', () => {
  let service: GooglesinginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooglesinginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
