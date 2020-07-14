import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmailCandidateComponent } from './sendmail-candidate.component';

describe('SendmailCandidateComponent', () => {
  let component: SendmailCandidateComponent;
  let fixture: ComponentFixture<SendmailCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendmailCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmailCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
