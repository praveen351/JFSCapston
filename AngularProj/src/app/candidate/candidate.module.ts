import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../materialmodule/material-module';
import { HttpClientModule } from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';
import { CandidateSurveyComponent } from './candidate-survey/candidate-survey.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmCandidateComponent } from './confirm-candidate/confirm-candidate.component';
import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';

@NgModule({
  declarations: [CandidateSurveyComponent, CandidateFormComponent, ConfirmCandidateComponent, CandidateHomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    CandidateRoutingModule
  ],
  exports: [
    CandidateSurveyComponent,
    CandidateFormComponent,
    ConfirmCandidateComponent
  ],
  providers: [ApiserviceService],
})
export class CandidateModule { }
