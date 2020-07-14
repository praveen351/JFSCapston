import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-candidate-child',
  templateUrl: './candidate-child.component.html',
  styleUrls: ['./candidate-child.component.css']
})
export class CandidateChildComponent implements OnInit {

  @Input() candidate_form: FormGroup;
  @Input() fillMode: boolean;

  constructor() {
    // this.candidate_form = (new SurveyForm(this.formBuilder)).getCandidateChildFormGroup();
  }

  ngOnInit(): void {
    // this.fillMode = false;
  }
}
