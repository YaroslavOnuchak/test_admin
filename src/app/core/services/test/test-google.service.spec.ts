import { TestBed } from '@angular/core/testing';

import { TestGoogleService } from './test-google.service';

describe('TestGoogleService', () => {
  let service: TestGoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestGoogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
