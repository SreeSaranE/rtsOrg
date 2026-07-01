import { TestBed } from '@angular/core/testing';

import { CandidateSignup } from './candidate-signup';

describe('CandidateSignup', () => {
  let service: CandidateSignup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateSignup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
