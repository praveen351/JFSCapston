import { Component, OnInit, Input } from '@angular/core';
import { SeriesClickEvent } from '@progress/kendo-angular-charts';
import { CandidateEntity } from 'src/app/model/candidateentity';
import { CandidateResponse } from 'src/app/model/candidate_response';
import { CandidateResponseData } from 'src/app/model/candidate_respo';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-scatter-info-cand',
  templateUrl: './scatter-info-cand.component.html',
  styleUrls: ['./scatter-info-cand.component.css']
})
export class ScatterInfoCandComponent implements OnInit {

  @Input() seriesData: number[];
  @Input() categories: string[];
  @Input() dataObj: Object;

  candData: CandidateEntity = new CandidateEntity();
  enableTableData: boolean;
  switchViewEdit: boolean;

  ELEMENT_DATA: CandidateResponseData[] = [];
  displayedColumns = ['candidate_request', 'candidate_response', 'candidate_response_type'];
  dataSource = new MatTableDataSource<CandidateResponseData>(this.ELEMENT_DATA);


  constructor() { }

  ngOnInit(): void {
    this.enableTableData = false;
    // this.enableTableData = true;
    this.switchViewEdit = true;
  }
  onSeriesClick(event: SeriesClickEvent) {
    var id: number = parseInt(event.category.replace('CID', ''));
    var datObj = this.dataObj as any;

    var covcandidate: CandidateEntity[] = datObj.covcandidate as CandidateEntity[];
    this.candData = new CandidateEntity();
    covcandidate.forEach(element => {
      if (element.candidate_id == id) {
        this.candData.candidate_name = element.candidate_name;
        this.candData.candidate_email = element.candidate_email;
        this.candData.response_date = element.response_date;
        this.candData.open_time = element.open_time;
        this.candData.close_time = element.close_time;
        this.candData.candidate_response_list = element.candidate_response_list;
        if (!this.switchViewEdit) {
          this.candResponse();
        }
      }
    });

    this.enableTableData = true;
  }
  candInfo() {
    this.switchViewEdit = true;
  }
  candResponse() {
    this.switchViewEdit = false;
    this.ELEMENT_DATA = [];
    this.candData.candidate_response_list.forEach(element => {
      this.ELEMENT_DATA.push({
        candidate_request: element.surveydetailentity.survey_question,
        candidate_response: element.candidate_response,
        candidate_type: element.surveydetailentity.responseentity.response_type
      });
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }
}
