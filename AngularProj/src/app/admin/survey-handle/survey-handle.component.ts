import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyData } from 'src/app/model/survey';
import { Survey } from 'src/app/model/surveyentity';
import { SurveyForm } from 'src/app/forms/Survetform';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-survey-handle',
  templateUrl: './survey-handle.component.html',
  styleUrls: ['./survey-handle.component.css']
})
export class SurveyHandleComponent implements OnInit {
  today: Date;
  // todaytime: string;
  // todaymtime: string;
  surveyList: BehaviorSubject<SurveyData[]> = new BehaviorSubject<SurveyData[]>([]);
  disableadd: boolean = false;
  disableedit: boolean = true;
  disableremove: boolean = true;
  formGroup: FormGroup;
  selectId: number = 0;
  addFormdisbler: boolean;
  sbtnName: string = '';
  switchViewEdit: boolean = true;
  currentSurvey: Survey;
  view_btn_ctrl: boolean;
  add_btn_ctrl: boolean;
  delete_btn_ctrl: boolean;
  update_btn_ctrl: boolean;

  constructor(private formBuilder: FormBuilder, private service: ApiserviceService, public datepipe: DatePipe, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    this.today = new Date();
    this.formGroup = (new SurveyForm(this.formBuilder)).getSurveyFormGroup();
    // this.todaytime = this.createTimeformat(0);
    // this.todaymtime = this.createTimeformat(1);

  }
  createTimeformat(hrs: number): string {
    let hours = this.today.getHours() + hrs;
    let minutes = this.today.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minute = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minute + ' ' + ampm;
    return strTime
  }
  getTime(event: any): void {
    console.log(event.target.value);
  }
  ngOnInit(): void {
    this.view_btn_ctrl = true;
    this.add_btn_ctrl = false;
    this.delete_btn_ctrl = true;
    this.update_btn_ctrl = true;

    this.disableadd = false;
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
  }
  getChildData(survey_id: any) {
    this.surveyList.subscribe(data => {
      data.forEach(object => {
        if (!(object.survey.surveyid === parseInt(survey_id))) {
          object.selected = false;
        } else {
          object.selected = true;
          this.selectId = parseInt(survey_id);
        }
      });
    });
    this.disableadd = true;
    this.disableedit = false;
    this.disableremove = false;
    console.log(survey_id);
  }
  onSubmit(data: any, formDirective: FormGroupDirective) {
    console.log(data);
    var surveyObj: Survey = new Survey(this.selectId, [], [], data.survey_name, (this.datepipe.transform(data.opening_date, 'MM/dd/yyyy')).toString().concat('@').concat(data.opening_time.toString()), this.datepipe.transform(data.closing_date, 'MM/dd/yyyy').toString().concat('@').concat(data.closing_time.toString()), parseInt(data.no_of_question), parseInt(data.no_of_candidate), "ACTIVE");

    formDirective.resetForm();
    this.formGroup.reset();

    this.spinner.show();
    this.service.addSurvey(surveyObj).subscribe((data) => {
      this.spinner.hide();
      if (data != null) {
        if (this.selectId == 0) {
          this.surveyList.subscribe(data => {
            data.push(new SurveyData(surveyObj, false));
          });
          this._snackBar.open('Survey ' + surveyObj.servey_name + ' is added Successfully' + ' is Select', "DISCARD", {
            duration: 1500,
          });
        } else {
          this.surveyList.subscribe(data => {
            data.forEach(object => {
              if (object.survey.surveyid === this.selectId) {
                object.survey.servey_name = surveyObj.servey_name;
                object.survey.opening_date_time = surveyObj.opening_date_time;
                object.survey.closing_date_time = surveyObj.closing_date_time;
                object.survey.no_of_candidate = surveyObj.no_of_candidate;
                object.survey.no_of_question = surveyObj.no_of_question;
              }
            });
          });
          this.addFormdisbler = false;
          this.switchViewEdit = false;
          this._snackBar.open('Survey ' + surveyObj.servey_name + ' is updated Successfully' + ' is Select', "DISCARD", {
            duration: 1500,
          });
        }
      }
    });
    console.log(surveyObj);
  }
  handleNumbervalidation(event) {
    if (parseInt(event.target.value) <= 0) {
      event.target.value = '';
    }
  }
  deleteSurvey() {
    this.deleteDataHandling();
  }
  editSurvey() {
    this.editDataHandling();
  }
  addSurvey() {
    this._snackBar.open('You are at Adding Survey Panel' + ' is Select', "DISCARD", {
      duration: 1500,
    });
    this.selectId = 0;
    this.sbtnName = "SubmitForm";
    this.addFormdisbler = true;
    this.switchViewEdit = true;
  }

  editChildData() {
    this.editDataHandling();
  }
  removeChildData() {
    this.deleteDataHandling();
  }
  viewChildData() {
    this.surveyList.subscribe((dataList) => {
      dataList.forEach(data => {
        if (data.survey.surveyid === this.selectId) {
          this.addFormdisbler = true;
          this.switchViewEdit = false;
          this.currentSurvey = data.survey;
          return false;
        }
      });
    });
  }

  private deleteDataHandling() {
    this.spinner.show();
    this.service.deleteSurvey(this.selectId).subscribe(data => {
      this.spinner.hide();
      if (data == 1) {
        this.surveyList.subscribe(datalist => {
          for (let index = 0; index < datalist.length; index++) {
            if (datalist[index].survey.surveyid == this.selectId) {
              this._snackBar.open('Survey ' + datalist[index].survey.servey_name + ' is deleted successfully ', "DISCARD", {
                duration: 1500,
              });
              datalist[index].selected = false;
              datalist.splice(index, 1);
              this.disableadd = false;
              this.disableedit = true;
              this.disableremove = true;
              this.switchViewEdit = true;
              this.surveyList.next(datalist);
              this.sbtnName = "SubmitForm";
              this.addFormdisbler = false;
              break;
            }
          }
        });
      }
    });
  }
  private editDataHandling() {
    this._snackBar.open('You are at Updated Survey Panel' + ' is Select', "DISCARD", {
      duration: 1500,
    });
    this.addFormdisbler = true;
    this.switchViewEdit = true;
    this.surveyList.subscribe(dalist => {
      dalist.forEach(object => {
        if (object.survey.surveyid === this.selectId) {
          var frmDate = object.survey.opening_date_time.split('@')[0];
          var toDate = object.survey.closing_date_time.split('@')[0];
          var frmDat: Date = new Date();
          var toDat: Date = new Date();
          frmDat.setFullYear(parseInt(frmDate.split('/')[2]));
          frmDat.setDate(parseInt(frmDate.split('/')[1]));
          frmDat.setMonth(parseInt(frmDate.split('/')[0]) - 1);

          toDat.setFullYear(parseInt(toDate.split('/')[2]));
          toDat.setDate(parseInt(toDate.split('/')[1]));
          toDat.setMonth(parseInt(toDate.split('/')[0]) - 1);

          this.formGroup.setValue({
            survey_name: object.survey.servey_name,
            opening_date: frmDat,
            closing_date: toDat,
            opening_time: object.survey.opening_date_time.split('@')[1],
            closing_time: object.survey.closing_date_time.split('@')[1],
            no_of_question: object.survey.no_of_question,
            no_of_candidate: object.survey.no_of_candidate
          });
          return false;
        }
      });
    });
    this.sbtnName = "EditForm";
  }
  addChildData() {

  }
  restComponent() {
    this.surveyList.subscribe(data => {
      data.forEach(object => {
        object.selected = false;
      });
    });
    this.selectId = 0;
    this.currentSurvey = new Survey();
    this.disableadd = false;
    this.disableedit = true;
    this.disableremove = true;
    this.addFormdisbler = false;
  }
}