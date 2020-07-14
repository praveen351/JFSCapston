import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormArray, FormControl, Validators } from '@angular/forms';
import { SurveyForm } from 'src/app/forms/Survetform';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit {

  // @Input() question: string = 'What is Your gender?';
  // @Input() responsetype: string = 'TEXTAREA';
  // @Input() responseoptions: string = "MALE,FEMALE";
  // @Input() responsescope: string = 'SINGLE';
  // @Input() formGroup: FormGroup = (new SurveyForm(this.formBuilder)).getCandidateResponseFormGroup();

  @Input() question: string;
  @Input() responsetype: string;
  @Input() responseoptions: string;
  @Input() responsescope: string;
  @Input() formGroup: FormGroup;
  @Input() countfield: number;

  responsescopeb: boolean;
  responseoption: string[] = [];
  listVControl: string[] = ['DROPDOWN', 'TEXTBOX', 'TEXTAREA', 'RADIOBUTTON', 'CHECKBOX'];
  listBControl: boolean[] = [false, false, false, false, false];

  constructor(private formBuilder: FormBuilder) {
    // this.formGroup = (new SurveyForm(this.formBuilder)).getCandidateResponseFormGroup();
  }
  get candidate_r_fcheckbox() {
    return this.formGroup.get('candidate_r_fcheckbox') as FormArray;
  }
  ngOnInit(): void {
    var index: number = this.listVControl.indexOf(this.responsetype);
    this.listBControl[index] = true;
    if (!(index == 1 || index == 2)) {
      this.responseoption = this.responseoptions.split(',');
      console.log(this.responseoptions);
      if (this.responsescope === 'SINGLE') {
        this.responsescopeb = false;
      } else {
        this.responsescopeb = true;
      }
      // this.candidate_response_form.removeAt(0);
      // this.responseoption.forEach(element => {
      //   this.candidate_response_form.push(this.formBuilder.group({ control_type: new FormControl('', [Validators.required]) }));
      // });
    }

  }
  onSubmit(formGroup: any, formDirective: FormGroupDirective) {
    console.log(this.formGroup);
  }
  checkClick(pointIndex: any) {
    if (this.responsescope === 'SINGLE') {
      for (let i = 0; i < this.candidate_r_fcheckbox.controls.length; i++) {
        if (parseInt(pointIndex) != i) {
          this.candidate_r_fcheckbox.controls[i].patchValue({
            control_type: false
          });
        }
      }
    }
  }
}
