import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import { FormBuilder, FormGroup, FormArray, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyData } from 'src/app/model/survey';
import { Survey } from 'src/app/model/surveyentity';
import { ResponseTypeEntity } from 'src/app/model/responsetypeentity';
import { SurveyForm } from 'src/app/forms/Survetform';
import { SurveyDetailEntity } from 'src/app/model/surveydetailentity';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.css']
})
export class SurveyDetailComponent implements OnInit {

  surveyList: BehaviorSubject<SurveyData[]> = new BehaviorSubject<SurveyData[]>([]);
  surveyfData: BehaviorSubject<Survey> = new BehaviorSubject<Survey>(new Survey());

  disableadd: boolean = true;
  disableedit: boolean = true;

  selectId: number = 0;
  addFormdisbler: boolean;
  sbtnName: string = '';
  formGroup: FormGroup;
  pformGrp: FormGroup;
  switchViewEdit: boolean = true;
  currentSurvey: Survey;
  responseTypeList: BehaviorSubject<ResponseTypeEntity[]> = new BehaviorSubject<ResponseTypeEntity[]>([]);
  handlerSwitch: boolean[] = [];
  fillMode: boolean;
  view_btn_ctrl: boolean;
  delete_btn_ctrl: boolean;
  add_btn_ctrl: boolean;
  update_btn_ctrl: boolean;
  // surveyDetailList: Survey;
  constructor(private formBuilder: FormBuilder, private service: ApiserviceService, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    this.formGroup = (new SurveyForm(this.formBuilder)).getSurveyDetIntFormGroup();
  }

  get survey_detail_form() {
    return this.formGroup.get('survey_detail_form') as FormArray;
  }
  addOptions() {
    if (this.survey_detail_form.length === this.currentSurvey.no_of_question) {
      this._snackBar.open('Sorry Your No of Candidates are exceeding there limit from ' + this.currentSurvey.no_of_candidate, "DISCARD", {
        duration: 1700,
      });
    } else {
      this.survey_detail_form.push((new SurveyForm(this.formBuilder)).getSurveyDetailFormGroup());
      this.handlerSwitch.push(false);
    }

    // } else {
    //   this.esurvey_detail_form.push((new SurveyForm(this.formBuilder)).getSurveyDetailFormGroup());
    //   this.handlerSwitch.push(false);
    // }

  }

  ngOnInit(): void {
    this.view_btn_ctrl = false;
    this.delete_btn_ctrl = false;
    this.add_btn_ctrl = true;
    this.update_btn_ctrl = true;

    this.spinner.show();
    this.service.getAllResponseType().subscribe((dataList) => {
      this.responseTypeList.next(dataList);
    });

    this.service.getAllSurvey().subscribe((dataList) => {
      this.spinner.hide();
      var surveylist: SurveyData[] = [];
      dataList.forEach(element => {
        surveylist.push(new SurveyData(element, false));
      });
      this.surveyList.next(surveylist);
    });
    this.addFormdisbler = false;
    this.handlerSwitch.push(false);
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
    this.addFormdisbler = false;
  }

  handleNumbervalidation(event) {
    if (parseInt(event.target.value) <= 0) {
      event.target.value = '';
    }
  }
  // deleteSurvey() {
  //   this.deleteDataHandling();
  // }
  editSurvey() {
    this._snackBar.open('You are in Updating panel of ' + this.currentSurvey.servey_name, "DISCARD", {
      duration: 1700,
    });
    this.editDataHandling();
  }

  addButtonHandler(): boolean {
    let j = 0;
    for (let i = 0; i < this.survey_detail_form.length; i++) {
      if (this.survey_detail_form.controls[i].valid)
        j++;
    }
    if (j === this.survey_detail_form.controls.length)
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
    this.formGroup = (new SurveyForm(this.formBuilder)).getSurveyDetIntFormGroup();
    this.fillMode = false;
    this.handlerSwitch = [];
    this.handlerSwitch.push(false);
    this.sbtnName = "SubmitForm";
    this.addFormdisbler = true;
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
    this.switchViewEdit = false;
  }

  private deleteDataHandling() {

  }
  private editDataHandling() {
    if (this.fillMode) {
      this.addSurveyData();
      // this.addFormdisbler = true;
      // this.switchViewEdit = true;
    }
    this.fillMode = true;
    this.handlerSwitch = [];

    this.pformGrp = (new SurveyForm(this.formBuilder)).getSurveyDetIntFormGroup();
    (this.pformGrp.get('survey_detail_form') as FormArray).removeAt(0);

    this.spinner.show();
    this.service.getSurvey(this.selectId).subscribe(data => {
      this.spinner.hide();
      data.survey_detail_list.forEach(listdata => {
        var resData: ResponseTypeEntity = listdata.responseentity;
        var optiondata = listdata.res_pro_val.split(',');
        var survey_detail_form: FormGroup = (new SurveyForm(this.formBuilder)).getSurveyDetailFormGroup();
        survey_detail_form.patchValue({
          survey_detail_id: listdata.survey_detail_id,
          survey_question: listdata.survey_question,
          res_pro_val: resData.response_type_id,
          user_res_scope: listdata.user_res_scope
        });

        if (!(resData.response_type === "TEXTBOX" || resData.response_type === "TEXTAREA"))
          this.handlerSwitch.push(true);
        else
          this.handlerSwitch.push(false);

        (survey_detail_form.get('response_val') as FormArray).removeAt(0);
        optiondata.forEach(datao => {
          (survey_detail_form.get('response_val') as FormArray).push(this.formBuilder.group({ options: new FormControl(datao, [Validators.required]) }));
        });
        (this.pformGrp.get('survey_detail_form') as FormArray).push(survey_detail_form);
      });
      // this.handlerSwitch = true;
      this.formGroup = this.pformGrp;
    });
    this.addFormdisbler = true;
    this.switchViewEdit = true;
    this.sbtnName = "UpdateForm";
  }
  deleteOption(index: any) {
    // console.log(index);
    if (this.fillMode) {
      var survey_det_id = parseInt(this.survey_detail_form.controls[index].get('survey_detail_id').value);
      var survey_question_id = this.survey_detail_form.controls[index].get('survey_question').value
      this.spinner.show();
      this.service.deleteSurveyDetail(survey_det_id).subscribe(data => {
        this.spinner.hide();
        if (data != 0) {
          this._snackBar.open('You have successfully deleted ' + survey_question_id + ' question', "DISCARD", {
            duration: 1700,
          });
          this.survey_detail_form.removeAt(parseInt(index));
          var dataArr: boolean[] = [];
          for (let i = 0; i < this.handlerSwitch.length; i++) {
            if (!(i == index)) {
              dataArr.push(this.handlerSwitch[i]);
            }
          }
          this.handlerSwitch = dataArr;
        }
        return true;
      });
    }
    this.survey_detail_form.removeAt(parseInt(index));
    var dataArr: boolean[] = [];
    for (let i = 0; i < this.handlerSwitch.length; i++) {
      if (!(i == index)) {
        dataArr.push(this.handlerSwitch[i]);
      }
    }
    this.handlerSwitch = dataArr;
  }
  onSubmit(formGroup: any, formDirective: FormGroupDirective) {

    var surveyDetaList: SurveyDetailEntity[] = []
    var formDataArr = this.survey_detail_form.controls;
    formDataArr.forEach(element => {
      var survey_question = element.get('survey_question').value;
      var survey_detail_id = element.get('survey_detail_id').value;
      var responseValue: ResponseTypeEntity = null;
      this.responseTypeList.subscribe(data => {
        data.forEach(repodata => {
          if (parseInt(element.get('res_pro_val').value) === repodata.response_type_id) {
            responseValue = repodata;
            return false;
          }
        });
      });
      var response_val = 'DATA';
      var user_res_scope = 'DATA';
      if (element.get('response_val') != undefined) {
        var datatemp: string = '';
        var optionvalue = element.get('response_val').value;
        var optionArray = Object.keys(optionvalue).map(function (personNamedIndex) {
          return optionvalue[personNamedIndex];
        });
        optionArray.forEach(data => {
          datatemp = datatemp.concat(data.options).concat(',');
        });
        response_val = datatemp.substr(0, datatemp.length - 1);
        user_res_scope = element.get('user_res_scope').value;
      }
      var tempSDetObj: SurveyDetailEntity = new SurveyDetailEntity(responseValue, survey_question, response_val, user_res_scope, "ACTIVE");
      tempSDetObj.survey_detail_id = survey_detail_id;
      surveyDetaList.push(tempSDetObj);
    });
    this.currentSurvey.survey_detail_list = surveyDetaList;
    // console.log(this.currentSurvey);
    // if (this.fillMode) {
    //   this.service.updateSurveyDetail(this.currentSurvey).subscribe(data => {
    //     formDirective.resetForm();
    //     this.formGroup.reset();
    //     this._snackBar.open('You had Updated data for' + this.currentSurvey.servey_name + ' successfully', "DISCARD", {
    //       duration: 1700,
    //     });
    //     this.addSurveyData();
    //   });

    // } else {
    this.spinner.show();
    this.service.addSurvey(this.currentSurvey).subscribe(data => {
      this.spinner.hide()
      formDirective.resetForm();
      this.formGroup.reset();
      this._snackBar.open('You had Added data for' + this.currentSurvey.servey_name + ' successfully', "DISCARD", {
        duration: 1700,
      });
      this.addSurveyData();
    });
    // }
  }
  addChildData() {
    this.addSurvey();
  }
}