import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableCandidateComponent } from './datatable-candidate.component';

describe('DatatableCandidateComponent', () => {
  let component: DatatableCandidateComponent;
  let fixture: ComponentFixture<DatatableCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
