import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCandidateComponent } from './confirm-candidate.component';

describe('ConfirmCandidateComponent', () => {
  let component: ConfirmCandidateComponent;
  let fixture: ComponentFixture<ConfirmCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
