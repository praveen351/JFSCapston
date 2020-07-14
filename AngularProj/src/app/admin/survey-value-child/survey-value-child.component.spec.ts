import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyValueChildComponent } from './survey-value-child.component';

describe('SurveyValueChildComponent', () => {
  let component: SurveyValueChildComponent;
  let fixture: ComponentFixture<SurveyValueChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyValueChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyValueChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
