import { Component, OnInit, Input, EventEmitter, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { BehaviorSubject } from 'rxjs';
import { ResponseTypeEntity } from 'src/app/model/responsetypeentity';

interface UserOptionType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-survey-child-detail',
  templateUrl: './survey-child-detail.component.html',
  styleUrls: ['./survey-child-detail.component.css']
})
export class SurveyChildDetailComponent implements OnInit {

  @Input() survey_detail_data: FormGroup;
  @Input() responseTypeList: BehaviorSubject<ResponseTypeEntity[]>;
  @Input() demandResType: boolean;
  @Input() fillMode: boolean;
  // @Input() pointIndex: number;

  // @Output() reflectFillMode = new EventEmitter<string>();

  selectedValue: string;
  selectedArr: boolean[] = [];
  useroptiontype: UserOptionType[] = [];

  constructor(private formBuilder: FormBuilder, private service: ApiserviceService) {
    // this.survey_detail_data = (new SurveyForm(this.formBuilder)).getSurveyDetailFormGroup();
  }
  get response_val() {
    return this.survey_detail_data.get('response_val') as FormArray;
  }
  addOptions() {
    if (this.response_val.length + 1 < 5)
      this.response_val.push(this.formBuilder.group({ options: new FormControl('', [Validators.required]) }));
  }

  addButtonHandler(): boolean {
    let j = 0;
    for (let i = 0; i < this.response_val.length; i++) {
      if (this.response_val.controls[i].valid)
        j++;
    }
    if (j === this.response_val.controls.length)
      return false;
    else
      return true;
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (changedProp.isFirstChange()) {
      } else {
        this.demandResType = !changedProp.currentValue;
        // console.log(changedProp.previousValue + " " + changedProp.currentValue + " " + this.survey_detail_data.get('survey_detail_id').value);
      }
    }
  }
  ngOnInit(): void {
    if (!this.demandResType) {
      if (this.survey_detail_data.get('response_val') && this.survey_detail_data.get('user_res_scope')) {
        this.survey_detail_data.removeControl('user_res_scope');
        this.survey_detail_data.removeControl('response_val');
      }
    } else {

      if (parseInt(this.survey_detail_data.get('res_pro_val').value) === 4) {
        this.useroptiontype = [
          { value: 'SINGLE', viewValue: 'SINGLE' }
        ];
      } else {
        this.useroptiontype = [
          { value: 'SINGLE', viewValue: 'SINGLE' },
          { value: 'MULTIPLE', viewValue: 'MULTIPLE' }
        ];
      }
    }
    // console.log(this.demandResType);
    // console.log(this.fillMode);
    // this.demandResType = false;
  }
  deleteOption(index: any) {
    console.log(index);
    this.response_val.removeAt(parseInt(index));
  }
  addSurveyDetail() {

  }
  removeSurveyDetail() {

  }
  onWriterChange() {

  }
  onOptionChange(event: any) {
    this.responseTypeList.subscribe(dataset => {
      var datavalue = '';
      dataset.forEach(responsedata => {
        if (parseInt(event.value) === responsedata.response_type_id) {
          datavalue = responsedata.response_scope;
          return false;
        }
      });
      if (datavalue == "MULTIPLE") {
        if (!(this.survey_detail_data.get('response_val') && this.survey_detail_data.get('user_res_scope'))) {
          this.survey_detail_data.addControl('response_val', this.formBuilder.array([this.formBuilder.group({ options: new FormControl('', [Validators.required]) })]))
          this.survey_detail_data.addControl('user_res_scope', new FormControl('', [Validators.required,]))
        }
        if (parseInt(this.survey_detail_data.get('res_pro_val').value) === 4) {
          this.useroptiontype = [
            { value: 'SINGLE', viewValue: 'SINGLE' }
          ];
        } else {
          this.useroptiontype = [
            { value: 'SINGLE', viewValue: 'SINGLE' },
            { value: 'MULTIPLE', viewValue: 'MULTIPLE' }
          ];
        }
        this.demandResType = true;
      } else {
        this.demandResType = false;
        if (this.survey_detail_data.get('response_val') && this.survey_detail_data.get('user_res_scope')) {
          this.survey_detail_data.removeControl('user_res_scope');
          this.survey_detail_data.removeControl('response_val');
        }
      }
    });
  }
}
