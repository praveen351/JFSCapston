import { Component, OnInit, ViewChild, Input, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateTable } from 'src/app/model/candidate_table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { CandidateEntity } from 'src/app/model/candidateentity';
import { CandidateMailTable } from 'src/app/model/candidate_mail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiserviceService } from '../apiservice.service';
import { CandidateMail } from 'src/app/model/select_candidate_mail';

@Component({
  selector: 'app-datatable-candidate',
  templateUrl: './datatable-candidate.component.html',
  styleUrls: ['./datatable-candidate.component.css']
})
export class DatatableCandidateComponent implements OnInit {

  // @Input() ELEMENT_DATA: CandidateTable[];
  @Input() candidateList: CandidateEntity[];

  ELEMENT_DATA: CandidateTable[] = [];
  ELEMENT_META_DATA: CandidateMailTable[] = [];

  paneltableinfo: boolean;

  displayedColumns = ['checked', 'count', 'name', 'mailId', 'candidate_id', 'sentstatus'];
  dataSource = new MatTableDataSource<CandidateTable>(this.ELEMENT_DATA);
  selection = new SelectionModel<CandidateTable>(true, []);

  displayedDetailColumns = ['count', 'sentdate', 'sentstatus'];
  dataDetailSource = new MatTableDataSource<CandidateMailTable>(this.ELEMENT_META_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  modestatus: boolean;

  constructor(private spinner: NgxSpinnerService, private service: ApiserviceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.paneltableinfo = true;
    this.modestatus = false;
  }

  onChangeUpdate(changedProp: any) {
    this.candidateList = changedProp.currentValue;
    let count: number = 1;
    changedProp.currentValue.forEach(cData => {
      this.ELEMENT_DATA.push(
        {
          checked: false,
          count: count,
          candidate_id: cData.candidate_id,
          name: cData.candidate_name,
          mailId: cData.candidate_email,
          sentstatus: 'mail'
        });
      count = count + 1;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.ELEMENT_DATA;
    this.dataSource.sort = this.sort;
    this.paneltableinfo = true;
    this.modestatus = false;
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (changedProp.isFirstChange()) {
        this.onChangeUpdate(changedProp);
      } else {
        this.onChangeUpdate(changedProp);
      }
    }
  }
  getCandidateInfo(candidate_id: any) {
    this.spinner.show();
    this.ELEMENT_META_DATA = [];
    this.service.getCandidateMails(parseInt(candidate_id)).subscribe(data => {
      this.spinner.hide();
      let count: number = 1;
      data.forEach(datamail => {
        this.ELEMENT_META_DATA.push({
          count: count,
          sentdate: datamail.mail_date,
          sentstatus: datamail.sent_status
        });
        count = count + 1;
      });
      this.dataDetailSource.paginator = this.paginator;
      this.dataDetailSource.data = this.ELEMENT_META_DATA;
      this.dataDetailSource.sort = this.sort;
      this.paneltableinfo = false;
      this.modestatus = true;

      this.candidateList.forEach(element => {
        if (element.candidate_id === parseInt(candidate_id)) {
          element.candidate_mail_list = data;
          return false;
        }
      });
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.checkNonSelection() : this.checkOnSelection();
  }
  checkOnSelection() {
    this.dataSource.data.forEach(row => this.selection.select(row));
    this.ELEMENT_DATA.forEach(element => {
      element.checked = true;
    });
  }
  checkNonSelection() {
    this.selection.clear();
    this.ELEMENT_DATA.forEach(element => {
      element.checked = false;
    });
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CandidateTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.count + 1}`;
  }

  sentmail() {
    //Send Mail to Candidate by api call
    this.modestatus = true;
    console.log(this.ELEMENT_DATA);
    var candMail: CandidateMail = new CandidateMail([]);
    this.ELEMENT_DATA.forEach(element => {
      if (element.checked) {
        this.candidateList.forEach(elementData => {
          if (elementData.candidate_id === element.candidate_id) {
            candMail.selectedCandidate.push(elementData);
            return false;
          }
        });
      }
    });
    this.ELEMENT_DATA.forEach(dataid => {
      if (dataid.checked === true)
        dataid.sentstatus = 'failure';
    });
    this.spinner.show();
    this.service.sendCandidateMail(candMail).subscribe(dataObj => {
      this.spinner.hide();
      this.selection.clear();
      dataObj.forEach(data => {
        var cand_id: number = data.candidate_id;
        this.ELEMENT_DATA.forEach(dataid => {
          if (cand_id === dataid.candidate_id) {
            dataid.sentstatus = 'success';
            return false;
          }
        });
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.ELEMENT_DATA;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!this.modestatus) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.dataDetailSource.filter = filterValue.trim().toLowerCase();
      if (this.dataDetailSource.paginator) {
        this.dataDetailSource.paginator.firstPage();
      }
    }
  }
  navigateButton() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.ELEMENT_DATA
    this.dataSource.sort = this.sort;
    this.paneltableinfo = true;
    this.modestatus = false;
  }
  disabledSentBtn() {
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i].checked === true) {
        return false;
      }
    }
    return true;
  }
}