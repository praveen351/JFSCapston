import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateChildComponent } from './candidate-child.component';

describe('CandidateChildComponent', () => {
  let component: CandidateChildComponent;
  let fixture: ComponentFixture<CandidateChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
