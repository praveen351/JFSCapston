import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidateDate } from '../validator/opdcdvalidation';
import { ValidateRepeatMail } from '../validator/validateUniquemail';

export class SurveyForm {
    private formGroup: FormGroup;
    constructor(private formBuilder: FormBuilder) {
    }
    public getSurveyFormGroup(): FormGroup {
        this.formGroup = this.formBuilder.group({
            survey_name: new FormControl('', [Validators.required]),
            opening_date: new FormControl('', [Validators.required]),
            closing_date: new FormControl('', [Validators.required,]),
            opening_time: new FormControl('', [Validators.required]),
            closing_time: new FormControl('', [Validators.required]),
            no_of_question: new FormControl('', [Validators.required]),
            no_of_candidate: new FormControl('', [Validators.required])
        }, {
            validators: ValidateDate('opening_date', 'closing_date')
        });
        return this.formGroup;
    }
    public getSurveyDetailFormGroup(): FormGroup {
        this.formGroup = this.formBuilder.group({
            survey_detail_id: new FormControl('0', [Validators.required]),
            survey_question: new FormControl('', [Validators.required]),
            res_pro_val: new FormControl('', [Validators.required]),
            response_val: this.formBuilder.array([this.formBuilder.group({ options: new FormControl('', [Validators.required]) })]),
            user_res_scope: new FormControl('', [Validators.required,])
        });
        return this.formGroup;
    }
    public getSurveyDetIntFormGroup(): FormGroup {
        this.formGroup = this.formBuilder.group({
            survey_detail_form: this.formBuilder.array([this.getSurveyDetailFormGroup()]),
        });
        return this.formGroup;
    }
    public getCandidateChildFormGroup(): FormGroup {
        this.formGroup = this.formBuilder.group({
            candidate_id: new FormControl('0', [Validators.required]),
            candidate_name: new FormControl('', [Validators.required]),
            candidate_email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
        });
        return this.formGroup;
    }
    public getCandidateFormGroup(): FormGroup {
        this.formGroup = this.formBuilder.group({
            candidate_final_form: this.formBuilder.array([this.getCandidateChildFormGroup()]),
        }, {
            validators: ValidateRepeatMail('candidate_final_form')
        });
        return this.formGroup;
    }
    public getCandidateResponseFormGroup(): FormGroup {
        this.formGroup = this.formBuilder.group({
            candidate_r_form: this.formBuilder.array([])
        });
        return this.formGroup;
    }
}