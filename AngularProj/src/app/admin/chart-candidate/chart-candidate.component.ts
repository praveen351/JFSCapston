import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SurveyData } from 'src/app/model/survey';
import { Survey } from 'src/app/model/surveyentity';
import { CandidateEntity } from 'src/app/model/candidateentity';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiserviceService } from '../apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { strict } from 'assert';
@Component({
  selector: 'app-chart-candidate',
  templateUrl: './chart-candidate.component.html',
  styleUrls: ['./chart-candidate.component.css']
})
export class ChartCandidateComponent implements OnInit {

  selectId: number = 0;
  currentSurvey: Survey;
  surveyList: BehaviorSubject<SurveyData[]> = new BehaviorSubject<SurveyData[]>([]);
  view_btn_ctrl: boolean;
  delete_btn_ctrl: boolean;
  add_btn_ctrl: boolean;
  update_btn_ctrl: boolean;
  addFormdisbler: boolean;
  dataObj: Object;
  switchDownFile: boolean;

  candidateList: CandidateEntity[] = [];

  public pieData: any[] = [
    { category: 'Still candidates are not Surveyed', value: 0.0 },
    { category: 'Candidates are not valid', value: 0.0 },
    { category: 'Candidate Completed the Survey', value: 0.0 },
    { category: 'No candidates are there', value: 0.0 }
  ];
  public seriesData: number[] = [];
  public categories: string[] = [];
  switchViewEdit: boolean;

  constructor(private spinner: NgxSpinnerService, private service: ApiserviceService, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.switchViewEdit = true;

    this.view_btn_ctrl = true;
    this.delete_btn_ctrl = false;
    this.add_btn_ctrl = false;
    this.update_btn_ctrl = false;
    this.addFormdisbler = false;
    this.switchDownFile = false;

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

    this.service.getCandidatesStatus(this.selectId).subscribe(data => {
      this.addFormdisbler = false;

      this.dataObj = data;
      var ddata: any = data as any;
      console.log(ddata);
      this.createpiechartdata(ddata);
      // this.createscatterchartdata(ddata);

      this.addFormdisbler = true;
    });
  }

  private createpiechartdata(ddata: any) {
    var covcandidate: CandidateEntity[] = ddata.covcandidate as CandidateEntity[];
    var ntacandidate: CandidateEntity[] = ddata.ntacandidate as CandidateEntity[];
    var inacandidate: CandidateEntity[] = ddata.inacandidate as CandidateEntity[];
    var restdata: number = covcandidate.length + ntacandidate.length + inacandidate.length;

    var pcovcandidate: number = (covcandidate.length * 1) / this.currentSurvey.no_of_candidate;
    var pntacandidate: number = (ntacandidate.length * 1) / this.currentSurvey.no_of_candidate;
    var pinacandidate: number = (inacandidate.length * 1) / this.currentSurvey.no_of_candidate;
    var prestdata: number = ((this.currentSurvey.no_of_candidate - restdata) * 1) / this.currentSurvey.no_of_candidate;

    this.pieData[0].value = pntacandidate;
    this.pieData[1].value = pinacandidate;
    this.pieData[2].value = pcovcandidate;
    this.pieData[3].value = prestdata;
  }

  private createscatterchartdata(ddata: any) {
    this.seriesData = [];
    this.categories = [];
    var surveyDate: string = this.currentSurvey.opening_date_time.split('@')[0];
    var surveyTime: string = this.currentSurvey.opening_date_time.split('@')[1];
    var todate: Date = this.stringTodate(surveyDate, surveyTime);

    var covcandidate: CandidateEntity[] = ddata.covcandidate as CandidateEntity[];
    covcandidate.forEach(element => {

      var tempDate: Date = this.stringTodate(element.response_date, '');
      var diff = Math.abs(tempDate.getTime() - todate.getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

      this.seriesData.push(diffDays);
      this.categories.push('CID'.concat((element.candidate_id).toString()));

    });
    console.log(this.seriesData);
  }
  private stringTodate(stringdate: string, stringtime: string) {
    var sdateArr = stringdate.split('/');

    var month = sdateArr[0];
    var day = sdateArr[1];
    var year = sdateArr[2];
    var datedata = year.concat('-').concat(month).concat('-').concat(day).concat(' ').concat(stringtime);

    var dt: Date = new Date(datedata);
    return dt;

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
          this.addFormdisbler = false;
          this.switchDownFile = false;
        }
      });
    });
  }

  piechart() {
    this.switchDownFile = false;
    this.switchViewEdit = true;
  }
  scatterplot() {
    this.switchViewEdit = false;
    this.switchDownFile = false;
    this.createscatterchartdata(this.dataObj);
  }
  downFile() {
    this.switchDownFile = true;
  }
}
