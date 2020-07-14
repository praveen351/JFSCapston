import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormArray, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { SurveyForm } from 'src/app/forms/Survetform';
import { CandidateEntity } from 'src/app/model/candidateentity';
import { CandidateResponse } from 'src/app/model/candidate_response';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { SurveyData } from 'src/app/model/survey';
import { SurveyDetailEntity } from 'src/app/model/surveydetailentity';
import { CandidateResponseEntity } from 'src/app/model/candidaterepositoryentity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-survey',
  templateUrl: './candidate-survey.component.html',
  styleUrls: ['./candidate-survey.component.css']
})
export class CandidateSurveyComponent implements OnInit {

  formGroup: FormGroup;
  sformGroup: FormGroup;
  gormHandler: boolean;
  candidate_obj: CandidateResponse[] = [];
  candidateDetailList: BehaviorSubject<SurveyDetailEntity[]> = new BehaviorSubject<SurveyDetailEntity[]>([]);
  candidate: CandidateEntity = new CandidateEntity();
  open_time: string = '';
  constructor(private formBuilder: FormBuilder, private service: ApiserviceService, private spinner: NgxSpinnerService, private _snackBar: MatSnackBar, private router: Router) {
    this.formGroup = (new SurveyForm(this.formBuilder)).getCandidateChildFormGroup();
    this.sformGroup = (new SurveyForm(this.formBuilder)).getCandidateResponseFormGroup();
  }

  get candidate_r_form() {
    return this.sformGroup.get('candidate_r_form') as FormArray;
  }

  ngOnInit(): void {
    this.formGroup.removeControl('candidate_id');
    this.gormHandler = true;
  }

  onSubmit(formGroup: any, formDirective: FormGroupDirective) {
    this.candidate.candidate_name = this.formGroup.get('candidate_name').value;
    this.candidate.candidate_email = this.formGroup.get('candidate_email').value;

    this.spinner.show();
    this.service.validateCandidate(this.candidate).subscribe(result => {
      if (result != 0) {
        this.service.getCandidate(result).subscribe(datareslt => {
          this.open_time = new Date().getHours().toString().
            concat(':').
            concat(new Date().getMinutes().toString()).
            concat(':').
            concat(new Date().getSeconds().toString());
          this.spinner.hide();
          this._snackBar.open('You are Successfully inserted into the survey kindly go for every questions', "DISCARD", {
            duration: 2000,
          });
          this.candidateDetailList.next(datareslt);
          datareslt.forEach(element => {
            var question: string = element.survey_question;
            var responseoptions: string = element.res_pro_val;
            var responsescope: string = element.user_res_scope;
            var responsetype: string = element.responseentity.response_type;

            this.candidate_obj.push(new CandidateResponse(question, responseoptions, responsescope, responsetype));

            if (responsetype === 'CHECKBOX') {
              // var comboArr: FormGroup = this.formBuilder.group({ candidate_r_fcheckbox: this.formBuilder.array([]) });
              var comboArr: FormGroup = this.formBuilder.group({ combo_arr: this.formBuilder.array([]) });
              var combodata = responseoptions.split(',');
              combodata.forEach(data => {
                // (comboArr.get('combo_arr') as FormArray).push(this.formBuilder.group({ control_type: new FormControl('', [Validators.required]) }));
                (comboArr.get('combo_arr') as FormArray).push(this.formBuilder.group({ control_type: new FormControl(false) }));
              });
              this.candidate_r_form.push(this.formBuilder.group({ candidate_r_fcheckbox: (comboArr.get('combo_arr') as FormArray) }));
              // this.candidate_r_form.push(comboArr);
            } else if (responsetype === 'TEXTBOX')
              this.candidate_r_form.push(this.formBuilder.group({ candidate_r_ftextbox: new FormControl('', [Validators.required]) }));
            else if (responsetype === 'TEXTAREA')
              this.candidate_r_form.push(this.formBuilder.group({ candidate_r_ftextarea: new FormControl('', [Validators.required]) }));
            else if (responsetype === 'DROPDOWN')
              this.candidate_r_form.push(this.formBuilder.group({ candidate_r_fselect: new FormControl(null, []) }));
            else if (responsetype === 'RADIOBUTTON')
              this.candidate_r_form.push(this.formBuilder.group({ candidate_r_fradio: new FormControl(null, []) }));
          });
          this.gormHandler = false;

          console.log(datareslt);
        });
      } else {
        this.spinner.hide();
        this._snackBar.open('Sorry your ' + this.candidate.candidate_email + ' and ' + this.candidate.candidate_name + ' are not been validated yet or your ID is expired. Kindly go for admin', "DISCARD", {
          duration: 1500,
        });
      }
    });
  }
  onSubmitForm(formGroup: any, formDirective: FormGroupDirective) {
    var objArray: Array<Object> = (this.sformGroup.value.candidate_r_form as Array<Object>);

    // formDirective.resetForm();
    // this.sformGroup.reset();

    console.log(objArray);
    var candData: CandidateEntity = new CandidateEntity();
    candData.candidate_response_list = [];
    this.spinner.show();
    this.candidateDetailList.subscribe(fetchdat => {
      var candidRespo: CandidateResponseEntity = new CandidateResponseEntity();
      fetchdat.forEach((data, index) => {

        let response_type = data.responseentity.response_type;
        let user_res_scope = data.user_res_scope;
        var fdata: any = objArray[index];
        var resultdata = '';

        if (response_type === 'CHECKBOX') {
          var fdatatype = fdata.candidate_r_fcheckbox;
          if (user_res_scope === 'SINGLE') {
            for (let i = 0; i < fdatatype.length; i++) {
              if (fdatatype[i].control_type == true) {
                resultdata = data.res_pro_val.split(',')[i];
                break;
              }
            }
          } else {
            for (let i = 0; i < fdatatype.length; i++) {
              if (fdatatype[i].control_type == true)
                resultdata = resultdata.concat(data.res_pro_val.split(',')[i]).concat(',');
            }
            resultdata = resultdata.substring(0, resultdata.length - 1);
          }
        } else if (response_type === 'DROPDOWN') {
          var fdatatype = fdata.candidate_r_fselect;
          if (user_res_scope === 'SINGLE') {
            resultdata = fdatatype;
          } else {
            for (let i = 0; i < fdatatype.length; i++) {
              resultdata = resultdata.concat(fdatatype[i]).concat(',');
            }
            resultdata = resultdata.substring(0, resultdata.length - 1);
          }
        } else if (response_type === 'TEXTBOX') {
          var fdatatype = fdata.candidate_r_ftextbox;
          resultdata = fdatatype;

        } else if (response_type === 'TEXTAREA') {
          var fdatatype = fdata.candidate_r_ftextarea;
          resultdata = fdatatype;

        } else if (response_type === 'RADIOBUTTON') {
          var fdatatype = fdata.candidate_r_fradio;
          resultdata = fdatatype;
        }
        candidRespo = new CandidateResponseEntity();
        candidRespo.candidate_response = resultdata;
        candidRespo.candidate_res_id = 0;
        candidRespo.status = "ACTIVE";
        candidRespo.surveydetailentity = data;
        candData.candidate_response_list.push(candidRespo);
      });
      this.service.getCandidateId(this.candidate).subscribe(data => {
        candData.candidate_id = parseInt(data.toString());
        candData.open_time = this.open_time;
        candData.close_time = new Date().getHours().toString().
          concat(':').
          concat(new Date().getMinutes().toString()).
          concat(':').
          concat(new Date().getSeconds().toString());
        candData.response_date = '';
        console.log(candData);

        // Call method to insert Data
        this.spinner.show();
        this.service.setCandidateResponse(candData).subscribe(confdata => {
          if (confdata == 1) {
            candData.candidate_mail_list = [];
            candData.candidate_response_list = [];
            this.service.sendCandidateConfirmationMail(candData).subscribe(data => {
              if (data == 1) {
                this.spinner.hide();
                sessionStorage.setItem('activeData', candData.candidate_id.toString());
                this._snackBar.open('Congratulation ' + this.candidate.candidate_name + ' You had successfully submited the survey Data', "DISCARD", {
                  duration: 1500,
                });
                this.router.navigateByUrl('candidate/confirmCandidate');
              }
            });
          } else if (confdata == 0) {
            this.spinner.hide();
            this._snackBar.open('Some responses are not set because of technical issue please contact to admin', "DISCARD", {
              duration: 1500,
            });
          } else {
            this.spinner.hide();
            this._snackBar.open('Updation for candidate is fail', "DISCARD", {
              duration: 1500,
            });
          }
        });
      });
    });
  }
}
