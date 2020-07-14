import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyHandleComponent } from './survey-handle/survey-handle.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { CandidateComponent } from './candidate/candidate.component';
import { SendmailCandidateComponent } from './sendmail-candidate/sendmail-candidate.component';
import { ChartCandidateComponent } from './chart-candidate/chart-candidate.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      {
        path: 'addSurvey',
        component: SurveyHandleComponent
      },
      {
        path: 'addSurveyDetail',
        component: SurveyDetailComponent
      },
      {
        path: 'addCandidate',
        component: CandidateComponent
      },
      {
        path: 'sendCandidateMail',
        component: SendmailCandidateComponent
      },
      {
        path: 'showStatitics',
        component: ChartCandidateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}