import { FormGroup, FormArray } from '@angular/forms';

export function ValidateRepeatMail(controlName: string) {
    return (formGroup: FormGroup) => {

        const control = formGroup.controls[controlName];

        let formdata = (control as FormArray);

        let emailArr: string[] = [];

        for (let i = 0; i < formdata.controls.length; i++) {
            let emstrng = formdata.controls[i].get('candidate_email').value;
            if (emailArr.indexOf(emstrng) == -1) {
                emailArr.push(emstrng);
            }
        }

        if (emailArr.length == formdata.controls.length) {
            return;
        } else {
            if (control != null) {
                control.setErrors({ mustNonEqual: true });
            }
        }
    }
}