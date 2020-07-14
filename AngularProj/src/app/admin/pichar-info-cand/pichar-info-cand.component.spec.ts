import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicharInfoCandComponent } from './pichar-info-cand.component';

describe('PicharInfoCandComponent', () => {
  let component: PicharInfoCandComponent;
  let fixture: ComponentFixture<PicharInfoCandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicharInfoCandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicharInfoCandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
