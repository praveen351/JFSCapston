import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { SurveyValueChildComponent } from './survey-value-child/survey-value-child.component';
import { SurveyHandleComponent } from './survey-handle/survey-handle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from './apiservice.service';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { SurveyChildDetailComponent } from './survey-child-detail/survey-child-detail.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateChildComponent } from './candidate-child/candidate-child.component';
import { MaterialModule } from '../materialmodule/material-module';
import { SendmailCandidateComponent } from './sendmail-candidate/sendmail-candidate.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DatatableCandidateComponent } from './datatable-candidate/datatable-candidate.component';
import { ChartCandidateComponent } from './chart-candidate/chart-candidate.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { NgChartjsModule } from 'ng-chartjs';
import { PicharInfoCandComponent } from './pichar-info-cand/pichar-info-cand.component';
import { ScatterInfoCandComponent } from './scatter-info-cand/scatter-info-cand.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { DownloadFileComponent } from './download-file/download-file.component';
// import { ChartsModule } from 'ng2-charts';
// import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [SurveyValueChildComponent, SurveyHandleComponent, SurveyDetailComponent, SurveyChildDetailComponent, CandidateComponent, CandidateChildComponent, SendmailCandidateComponent, DatatableCandidateComponent, ChartCandidateComponent, PicharInfoCandComponent, ScatterInfoCandComponent, AdminHomeComponent, UploadFilesComponent, DownloadFileComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ChartsModule
  ],
  exports: [
    SurveyValueChildComponent,
    SurveyHandleComponent,
    SurveyDetailComponent,
    SurveyChildDetailComponent,
    CandidateComponent,
    CandidateChildComponent,
    SendmailCandidateComponent,
    ChartCandidateComponent,
    AdminHomeComponent,
    UploadFilesComponent,
    DownloadFileComponent
  ],
  providers: [ApiserviceService, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
