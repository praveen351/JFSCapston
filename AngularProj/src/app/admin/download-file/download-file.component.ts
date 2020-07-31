import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {

  @Input() surveyid: number;

  infrespHandler: boolean;
  constructor(private service: ApiserviceService) { }

  ngOnInit(): void {
    this.infrespHandler = true;
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
  dcsvFileSystem() {
    if (!this.infrespHandler) {
      this.service.cdownloaddetail(this.surveyid)
        .subscribe(response => {
          this.savecsvFile(response.body, 'candidate_detail');
        });
    } else {
      this.service.cdownload(this.surveyid)
        .subscribe(response => {
          this.savecsvFile(response.body, 'candidate');
        });
    }
  }
  dxlsFileSystem() {
    if (!this.infrespHandler) {
      this.service.edownloaddetail(this.surveyid)
        .subscribe(response => {
          this.savexlFile(response.body, 'candidate_xlsd');
        });
    } else {
      this.service.edownload(this.surveyid)
        .subscribe(response => {
          this.savexlFile(response.body, 'candidate_xls');
        });
    }
  }
  private savecsvFile(data: any, filename?: string) {
    const blob = new Blob([data], { type: 'text/csv; charset=utf-8' });
    const file = new File([blob], filename + '.csv', { type: 'text/csv; charset=utf-8' });
    saveAs(file);

  }
  private savexlFile(data: any, filename?: string) {
    const file = new File([data], filename + '.xlsx', { type: 'application/vnd.ms.excel;' });
    saveAs(file);
  }
  switchCanInfo() {
    this.infrespHandler = true;
  }
  switchCanRespo() {
    this.infrespHandler = false;
  }
}
