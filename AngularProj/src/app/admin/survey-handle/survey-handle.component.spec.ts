import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyHandleComponent } from './survey-handle.component';

describe('SurveyHandleComponent', () => {
  let component: SurveyHandleComponent;
  let fixture: ComponentFixture<SurveyHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
