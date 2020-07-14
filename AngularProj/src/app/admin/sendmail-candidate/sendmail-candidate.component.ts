import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiserviceService } from '../apiservice.service';
import { SurveyData } from 'src/app/model/survey';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Survey } from 'src/app/model/surveyentity';
import { CandidateEntity } from 'src/app/model/candidateentity';

@Component({
  selector: 'app-sendmail-candidate',
  templateUrl: './sendmail-candidate.component.html',
  styleUrls: ['./sendmail-candidate.component.css']
})
export class SendmailCandidateComponent implements OnInit {
  selectId: number = 0;
  currentSurvey: Survey;
  surveyList: BehaviorSubject<SurveyData[]> = new BehaviorSubject<SurveyData[]>([]);
  view_btn_ctrl: boolean;
  delete_btn_ctrl: boolean;
  add_btn_ctrl: boolean;
  update_btn_ctrl: boolean;
  addFormdisbler: boolean;
  candidateList: CandidateEntity[] = [];

  constructor(private spinner: NgxSpinnerService, private service: ApiserviceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.view_btn_ctrl = true;
    this.delete_btn_ctrl = false;
    this.add_btn_ctrl = false;
    this.update_btn_ctrl = false;
    this.addFormdisbler = false;

    this.spinner.show();
    this.service.getAllSurvey().subscribe((dataList) => {
      this.spinner.hide();
      var surveylist: SurveyData[] = [];
      dataList.forEach(element => {
        surveylist.push(new SurveyData(element, false));
      });
      this.surveyList.next(surveylist);
    });
  }

  editChildData() { }
  removeChildData() { }
  addChildData() { }
  viewChildData() {
    this.addFormdisbler = true;

    // let count: number = 1;
    // this.currentSurvey.candidate_list.forEach(cData => {
    //   this.ELEMENT_DATA.push(
    //     {
    //       checked: false,
    //       count: count,
    //       candidate_id: cData.candidate_id,
    //       name: cData.candidate_name,
    //       mailId: cData.candidate_email
    //     });
    //   count = count + 1;
    // });
    this.candidateList = this.currentSurvey.candidate_list;
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
  }
  getCandidateInfo(candidate_id: any) {
    console.log(candidate_id);
  }
  // sentmail() {
  //   console.log(this.ELEMENT_DATA);
  // }
}
