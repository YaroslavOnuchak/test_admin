import { TestBed } from '@angular/core/testing';

import { GetUsersResolver } from './get-users.resolver';

describe('GetUsersResolver', () => {
  let resolver: GetUsersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetUsersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
