import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateSurveyComponent } from './candidate-survey/candidate-survey.component';
import { ConfirmCandidateComponent } from './confirm-candidate/confirm-candidate.component';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';

const routes: Routes = [
  {
    path: 'candidate',
    children: [
      {
        path: '',
        component: CandidateHomeComponent,
      },
      {
        path: 'loginCandidate',
        component: CandidateSurveyComponent
      },
      {
        path: 'confirmCandidate',
        component: ConfirmCandidateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CandidateRoutingModule {

}