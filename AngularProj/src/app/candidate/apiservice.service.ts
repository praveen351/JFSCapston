import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidateEntity } from '../model/candidateentity';
import { SurveyDetailEntity } from '../model/surveydetailentity';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private candidateurl: string = 'http://localhost:7777/candidate';
  private mailurl: string = 'http://localhost:7777/mail';
  constructor(private http: HttpClient) {

  }

  public validateCandidate(candidate_obj: CandidateEntity): Observable<Number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Number>(this.candidateurl + '/validateCandidate', candidate_obj, httpOptions);
  }

  public getCandidateId(candidate_obj: CandidateEntity): Observable<Number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Number>(this.candidateurl + '/getCandidateId', candidate_obj, httpOptions);
  }

  public getCandidate(survey_id: Number): Observable<SurveyDetailEntity[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<SurveyDetailEntity[]>(this.candidateurl + '/getCandidate/' + survey_id, httpOptions);
  }

  public setCandidateResponse(candidate: CandidateEntity): Observable<Number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Number>(this.candidateurl + '/setCandidateResponse', candidate, httpOptions);
  }

  public sendCandidateConfirmationMail(candidate: CandidateEntity): Observable<Number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Number>(this.mailurl + '/sendCandidateConfirmationMail', candidate, httpOptions);
  }
}
