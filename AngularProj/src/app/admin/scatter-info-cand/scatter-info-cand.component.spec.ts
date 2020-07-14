import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterInfoCandComponent } from './scatter-info-cand.component';

describe('ScatterInfoCandComponent', () => {
  let component: ScatterInfoCandComponent;
  let fixture: ComponentFixture<ScatterInfoCandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterInfoCandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterInfoCandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
