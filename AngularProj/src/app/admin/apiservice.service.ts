import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../model/surveyentity';
import { ResponseTypeEntity } from '../model/responsetypeentity';
import { CandidateMail } from '../model/select_candidate_mail';
import { CandidateMailEntity } from '../model/candidatemail';
import { CandidateMailResponse } from '../model/candidate_mail_res';
import { CandidateEntity } from '../model/candidateentity';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  surveyurl: string = 'http://localhost:7777/survey';
  candidateurl: string = 'http://localhost:7777/candidate';
  mailurl: string = 'http://localhost:7777/mail';

  constructor(private http: HttpClient) {

  }
  public addSurvey(surveyObj: Survey): Observable<Survey> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Survey>(this.surveyurl + '/saveSurvey',
      surveyObj, httpOptions);
  }

  // public updateSurveyDetail(surveyObj: Survey): Observable<Survey> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.post<Survey>(this.surveyurl + '/updateSurvey',
  //     surveyObj, httpOptions);
  // }

  public getAllSurvey(): Observable<Survey[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Survey[]>(this.surveyurl + '/getAllSurvey', httpOptions);
  }
  public deleteSurvey(survey_id: number): Observable<Number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Number>(this.surveyurl + '/deleteSurvey/' + survey_id, httpOptions);
  }
  public deleteSurveyDetail(survey_detail_id: number): Observable<Number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Number>(this.surveyurl + '/deleteSurveyDetail/' + survey_detail_id, httpOptions);
  }

  public deleteCandidate(candidate_id: number): Observable<Number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Number>(this.candidateurl + '/deleteCandidate/' + candidate_id, httpOptions);
  }

  public getAllResponseType(): Observable<ResponseTypeEntity[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<ResponseTypeEntity[]>(this.surveyurl + '/getAllResponseType', httpOptions);
  }
  // public getResponseType(response_type_id: number): Observable<ResponseTypeEntity> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.get<ResponseTypeEntity>(this.surveyurl + '/getResponseType/' + response_type_id, httpOptions);
  // }

  public getLoader(): Observable<Survey> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.get<any>(this.surveyurl + '/getLoader', httpOptions);
    return this.http.get<Survey>('http://localhost:7777/survey/getLoader', httpOptions);
  }

  public getSurvey(survey_id: number): Observable<Survey> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Survey>(this.surveyurl + '/getSurvey/' + survey_id, httpOptions);
  }

  public getCandidateMails(candidate_id: number): Observable<CandidateMailEntity[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<CandidateMailEntity[]>(this.mailurl + '/getCandidateMails/' + candidate_id, httpOptions);
  }

  public addCandidate(surveyObj: Survey): Observable<Survey> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Survey>(this.candidateurl + '/saveCandidate',
      surveyObj, httpOptions);
  }
  public sendCandidateMail(canMailObj: CandidateMail): Observable<CandidateMailResponse[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<CandidateMailResponse[]>(this.mailurl + '/sendCandidateMail',
      canMailObj, httpOptions);
  }

  public getCandidatesStatus(survey_id: number): Observable<Object> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Object>(this.candidateurl + '/getCandidatesStatus/' + survey_id, httpOptions);
  }
}