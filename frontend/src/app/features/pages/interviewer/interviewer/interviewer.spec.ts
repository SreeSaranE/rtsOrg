import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Interviewer } from './interviewer';

describe('Interviewer', () => {
  let component: Interviewer;
  let fixture: ComponentFixture<Interviewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Interviewer],
    }).compileComponents();

    fixture = TestBed.createComponent(Interviewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
