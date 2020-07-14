import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCandidateComponent } from './chart-candidate.component';

describe('ChartCandidateComponent', () => {
  let component: ChartCandidateComponent;
  let fixture: ComponentFixture<ChartCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
