import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyChildDetailComponent } from './survey-child-detail.component';

describe('SurveyChildDetailComponent', () => {
  let component: SurveyChildDetailComponent;
  let fixture: ComponentFixture<SurveyChildDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyChildDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyChildDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
