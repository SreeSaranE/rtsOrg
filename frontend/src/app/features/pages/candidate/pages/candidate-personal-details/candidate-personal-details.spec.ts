import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePersonalDetails } from './candidate-personal-details';

describe('CandidatePersonalDetails', () => {
  let component: CandidatePersonalDetails;
  let fixture: ComponentFixture<CandidatePersonalDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatePersonalDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatePersonalDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
