import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateStatusTable } from 'src/app/model/candidate_req_data';
import { IntlService } from '@progress/kendo-angular-intl';
import { LegendLabelsContentArgs, SeriesClickEvent } from '@progress/kendo-angular-charts';
import { CandidateEntity } from 'src/app/model/candidateentity';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-pichar-info-cand',
  templateUrl: './pichar-info-cand.component.html',
  styleUrls: ['./pichar-info-cand.component.css']
})
export class PicharInfoCandComponent implements OnInit {
  @Input() pieData: any[];
  @Input() dataObj: Object;

  enableTableData: boolean;
  tablevisibility: boolean;
  rtext: string;
  colorstream: string;

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ELEMENT_DATA: CandidateStatusTable[] = [];
  displayedColumns = ['name', 'mailId', 'candidatestatus'];
  dataSource = new MatTableDataSource<CandidateStatusTable>(this.ELEMENT_DATA);

  constructor(private intl: IntlService) {
    this.labelContent = this.labelContent.bind(this);
  }

  public labelContent(args: LegendLabelsContentArgs): string {
    return `${this.intl.formatNumber(args.dataItem.value, 'p2')}`;
  }
  ngOnInit(): void {
    this.enableTableData = false;
    this.tablevisibility = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSeriesClick(event: SeriesClickEvent) {
    var ddata: any = this.dataObj as any;
    var selectstatus: boolean = false;
    var candidate: CandidateEntity[] = [];
    var candidatestatus: string = '';
    if (event.dataItem.category === 'Still candidates are not Surveyed') {
      this.enableTableData = true;
      this.tablevisibility = true;
      selectstatus = true;
      candidate = ddata.ntacandidate as CandidateEntity[];
      candidatestatus = 'assignment_late';
      this.rtext = "Still Candidates are not visited the Survey";
      this.colorstream = "darkorange";
    } else if (event.dataItem.category === 'Candidates are not valid') {
      this.enableTableData = true;
      this.tablevisibility = true;
      selectstatus = true;
      candidatestatus = 'assignment_returned';
      candidate = ddata.inacandidate as CandidateEntity[];
      this.rtext = "All Candidates are inactive";
      this.colorstream = "darkslateblue";
    } else if (event.dataItem.category === 'Candidate Completed the Survey') {
      this.enableTableData = true;
      this.tablevisibility = true;
      selectstatus = true;
      candidatestatus = 'assignment_turned_in';
      candidate = ddata.covcandidate as CandidateEntity[];
      this.rtext = "All Candidates are activated";
      this.colorstream = "cyan";
    } else if (event.dataItem.category === 'No candidates are there') {
      this.enableTableData = true;
      this.tablevisibility = false;
      selectstatus = true;
      candidate = [];
      this.rtext = "Candidates are not available";
      this.colorstream = "darkslategrey";
    }

    if (selectstatus && this.tablevisibility) {
      this.ELEMENT_DATA = [];
      candidate.forEach(element => {
        this.ELEMENT_DATA.push({
          name: element.candidate_name,
          mailId: element.candidate_email,
          candidatestatus: candidatestatus
        });
      });
      this.dataSource.data = this.ELEMENT_DATA;
    }
  }
}