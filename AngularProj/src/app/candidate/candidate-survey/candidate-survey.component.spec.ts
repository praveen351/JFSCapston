import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSurveyComponent } from './candidate-survey.component';

describe('CandidateSurveyComponent', () => {
  let component: CandidateSurveyComponent;
  let fixture: ComponentFixture<CandidateSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
