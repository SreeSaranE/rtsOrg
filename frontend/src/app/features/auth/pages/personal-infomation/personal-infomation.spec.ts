import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfomation } from './personal-infomation';

describe('PersonalInfomation', () => {
  let component: PersonalInfomation;
  let fixture: ComponentFixture<PersonalInfomation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInfomation],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInfomation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
