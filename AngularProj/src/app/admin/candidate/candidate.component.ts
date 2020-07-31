import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyData } from 'src/app/model/survey';
import { Survey } from 'src/app/model/surveyentity';
import { SurveyForm } from 'src/app/forms/Survetform';
import { CandidateEntity } from 'src/app/model/candidateentity';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  surveyList: BehaviorSubject<SurveyData[]> = new BehaviorSubject<SurveyData[]>([]);
  surveyfData: BehaviorSubject<Survey> = new BehaviorSubject<Survey>(new Survey());

  disableadd: boolean = true;
  disableedit: boolean = true;
  disableupload: boolean = true;
  enableUploadFile: boolean = true;

  selectId: number = 0;
  currentSurvey: Survey;
  addFormdisbler: boolean;
  sbtnName: string = '';
  formGroup: FormGroup;
  pformGrp: FormGroup;
  switchViewEdit: boolean = true;
  fillMode: boolean;
  view_btn_ctrl: boolean;
  delete_btn_ctrl: boolean;
  add_btn_ctrl: boolean;
  update_btn_ctrl: boolean;

  constructor(private formBuilder: FormBuilder, private service: ApiserviceService, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    this.formGroup = (new SurveyForm(this.formBuilder)).getCandidateFormGroup();
  }

  get candidate_final_form() {
    return this.formGroup.get('candidate_final_form') as FormArray;
  }
  addOptions() {
    if (this.candidate_final_form.length === this.currentSurvey.no_of_candidate) {
      this._snackBar.open('Sorry Your No of Questions are exceeding there limit from ' + this.currentSurvey.no_of_question, "DISCARD", {
        duration: 1700,
      });
    } else {
      this.candidate_final_form.push((new SurveyForm(this.formBuilder)).getCandidateChildFormGroup());
    }
  }

  ngOnInit(): void {
    this.view_btn_ctrl = false;
    this.delete_btn_ctrl = false;
    this.add_btn_ctrl = true;
    this.update_btn_ctrl = true;

    this.spinner.show();
    this.service.getAllSurvey().subscribe((dataList) => {
      this.spinner.hide();
      var surveylist: SurveyData[] = [];
      dataList.forEach(element => {
        surveylist.push(new SurveyData(element, false));
      });
      this.surveyList.next(surveylist);
    });
    this.addFormdisbler = false;
    this.view_btn_ctrl = false;
    this.delete_btn_ctrl = false;
  }
  getChildData(survey_id: any) {
    this.surveyList.subscribe(data => {
      data.forEach(object => {
        if (!(object.survey.surveyid === parseInt(survey_id))) {
          object.selected = false;
        } else {
          object.selected = true;
          this.selectId = parseInt(survey_id);
          this.currentSurvey = object.survey;
          this._snackBar.open(object.survey.servey_name + ' is Select', "DISCARD", {
            duration: 1500,
          });
        }
      });
    });
    this.disableadd = false;
    this.disableedit = false;
    this.disableupload = false;
    this.enableUploadFile = true;
    this.addFormdisbler = false;
  }

  editSurvey() {
    this._snackBar.open('You are in Updating panel of ' + this.currentSurvey.servey_name, "DISCARD", {
      duration: 1700,
    });
    this.editDataHandling();
  }

  addButtonHandler(): boolean {
    let j = 0;
    if (!this.candidate_final_form.valid) {
      return true;
    }
    for (let i = 0; i < this.candidate_final_form.length; i++) {
      if (this.candidate_final_form.controls[i].valid)
        j++;
    }
    if (j === this.candidate_final_form.controls.length)
      return false;
    else
      return true;
  }

  addSurvey() {
    this.addSurveyData();
    this._snackBar.open('You are in Adding panel of ' + this.currentSurvey.servey_name, "DISCARD", {
      duration: 1700,
    });
  }
  addSurveyData() {
    this.formGroup = (new SurveyForm(this.formBuilder)).getCandidateFormGroup();
    this.fillMode = false;
    this.sbtnName = "SubmitForm";
    this.addFormdisbler = true;
    this.enableUploadFile = true;
    this.switchViewEdit = true;
  }
  editChildData() {
    this.editSurvey();
  }
  removeChildData() {
    this.deleteDataHandling();
  }
  viewChildData() {
    this.addFormdisbler = true;
    this.enableUploadFile = true;
    this.switchViewEdit = false;
  }

  private deleteDataHandling() {

  }
  private editDataHandling() {
    if (this.fillMode)
      this.addSurveyData();

    this.fillMode = true;
    this.pformGrp = (new SurveyForm(this.formBuilder)).getCandidateFormGroup();
    (this.pformGrp.get('candidate_final_form') as FormArray).removeAt(0);

    this.spinner.show();
    this.service.getSurvey(this.selectId).subscribe(data => {
      this.spinner.hide();
      data.candidate_list.forEach(listdata => {
        var candidate_form: FormGroup = (new SurveyForm(this.formBuilder)).getCandidateChildFormGroup();
        candidate_form.patchValue({
          candidate_id: listdata.candidate_id,
          candidate_name: listdata.candidate_name,
          candidate_email: listdata.candidate_email
        });
        (this.pformGrp.get('candidate_final_form') as FormArray).push(candidate_form);
      });
      this.formGroup = this.pformGrp;
    });
    this.addFormdisbler = true;
    this.enableUploadFile = true;
    this.switchViewEdit = true;
    this.sbtnName = "UpdateForm";
  }
  deleteOption(index: any) {
    if (this.fillMode) {
      var candidate_id = parseInt(this.candidate_final_form.controls[index].get('candidate_id').value);
      var candidate_name = this.candidate_final_form.controls[index].get('candidate_name').value
      this.spinner.show();
      this.service.deleteCandidate(candidate_id).subscribe(data => {
        this.spinner.hide();
        if (data != 0) {
          this._snackBar.open('You have successfully deleted ' + candidate_name + ' candidate', "DISCARD", {
            duration: 1700,
          });
          this.candidate_final_form.removeAt(parseInt(index));
        }
        return true;
      });
    }
    this.candidate_final_form.removeAt(parseInt(index));


  }
  onSubmit(formGroup: any, formDirective: FormGroupDirective) {
    var emailFormArray: FormArray = (this.formGroup.get('candidate_final_form') as FormArray);
    var emailArray = [];
    emailFormArray.controls.forEach(data => {
      emailArray.push(data.get('candidate_email').value);
    });
    var dataArr = emailArray.map((data, pos) => {
      return emailArray.indexOf(data) == pos;
    });
    var status: Number = 0;
    var count = 0;
    dataArr.forEach((data, pos) => {
      if (!data) {
        status = 1;
        count = count + 1;
        emailFormArray.controls[pos].get('candidate_email').setValue(null);
        emailFormArray.controls[pos].get('candidate_email').setErrors({ mustUnique: true });
      }
    });
    if (status == 0) {
      var candidate: CandidateEntity[] = [];
      var formDataArr = this.candidate_final_form.controls;
      formDataArr.forEach(element => {
        var candidate_id = element.get('candidate_id').value;
        var candidate_name = element.get('candidate_name').value;
        var candidate_email = element.get('candidate_email').value;
        candidate.push(new CandidateEntity(candidate_id, [], [], candidate_name, candidate_email, null, null, null, "ACTIVE"));
      });
      this.currentSurvey.candidate_list = candidate;
      console.log(this.currentSurvey);
      this.spinner.show();
      this.service.addCandidate(this.currentSurvey).subscribe(data => {
        this.spinner.hide();
        formDirective.resetForm();
        this.formGroup.reset();
        this._snackBar.open('You had Added data for' + this.currentSurvey.servey_name + ' successfully', "DISCARD", {
          duration: 1700,
        });
        this.addSurveyData();
      });
    } else {
      this._snackBar.open('There are ' + count + ' much E Mail field are duplicate , Mail IDs must be unique', "DISCARD", {
        duration: 2000,
      });
    }
  }
  addChildData() {
    this.addSurvey();
  }
  uploadFile() {
    this.enableUploadFile = false;
    this.addFormdisbler = false;
  }
}