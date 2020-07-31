import { Component, OnInit, ViewChild, Input, SimpleChange } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
// import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CandidateEntity } from 'src/app/model/candidateentity';
import { ApiserviceService } from '../apiservice.service';
type AOA = any[][];

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})

export class UploadFilesComponent implements OnInit {

  @Input() surveyid: number;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  handleUpload: boolean = false;
  handleUpDataTble: boolean = false;
  handleUpAttach: boolean = true;
  handleUpProgressor: boolean = false;

  dataSource = new MatTableDataSource<CandidateEntity>([]);
  displayedColumns = ["candid", "candname", "candmail"];

  switchMode: boolean = true;
  fileaccepttype: string = "";
  fileUrl: any;
  data: AOA = [[], []];

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(private service: ApiserviceService) { }

  ngOnInit() {
    this.fileaccepttype = '.xlsx';
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (changedProp.isFirstChange()) {
        this.surveyid = changedProp.currentValue;
      } else {
        this.surveyid = changedProp.currentValue;
      }
    }
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.handleUpload = true;

    if (this.switchMode) {
      console.log('Excel');
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1)
        throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        var datacan: CandidateEntity[] = [];
        this.data.forEach((data, index) => {
          if (index > 0) {
            datacan.push(new CandidateEntity(parseInt(data[0]), null, null, data[1], data[2], null, null, null, null));
          }
        });
        this.dataSource.data = datacan;
        console.log(this.data);
      };
      reader.readAsBinaryString(target.files[0]);
    } else {
      console.log('CSV');
      let file: File = this.selectedFiles.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;

        csv.split('\n')
        var datacan: CandidateEntity[] = [];
        csv.split('\n').forEach((data, index) => {
          if (index > 0 && data != "") {
            // datacan.push(new CandidateEntity(parseInt(data.split(',')[0]), data.split(',')[1], data.split(',')[2]));
            // parseInt(data[0]), null, null, data[1], data[2], null, null, null, null
            datacan.push(new CandidateEntity(parseInt(data.split(',')[0]), null, null, data.split(',')[1], data.split(',')[2], null, null, null, null));
          }
        });
        this.dataSource.data = datacan;
      }
    }

  }

  upload() {
    this.handleUpDataTble = false;
    this.progress = 0;
    this.handleUpProgressor = true;
    this.currentFile = this.selectedFiles.item(0);
    if (this.switchMode) {
      this.service.eupload(this.currentFile, this.surveyid).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
          }
        },
        err => {
          this.progress = 0;
          this.message = 'Could nots upload the file!';
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    } else {
      this.service.cupload(this.currentFile, this.surveyid).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
          }
        },
        err => {
          this.progress = 0;
          this.message = 'Could nots upload the file!';
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    }

  }

  displayTable(): void {
    this.handleUpDataTble = !this.handleUpDataTble;
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
  switchExcel() {
    this.handleUpAttach = false;
    this.switchMode = true;
    this.fileaccepttype = '.xlsx';
    this.setHandler();
  }
  switchCSV() {
    this.handleUpAttach = false;
    this.switchMode = false;
    this.fileaccepttype = '.csv';
    this.setHandler();
  }
  private setHandler() {
    this.handleUpload = false;
    this.handleUpDataTble = false;
    this.handleUpProgressor = false;
  }
}