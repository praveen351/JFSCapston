import { ResponseTypeEntity } from './responsetypeentity';

export class SurveyDetailEntity {
    public survey_detail_id: number;
    public responseentity: ResponseTypeEntity;
    public survey_question: string;
    public res_pro_val: string;
    public user_res_scope: string;
    public status: string;

    constructor(responseentity?: ResponseTypeEntity, survey_question?: string, res_pro_val?: string, user_res_scope?: string, status?: string) {
        this.responseentity = responseentity;
        this.survey_question = survey_question;
        this.res_pro_val = res_pro_val;
        this.user_res_scope = user_res_scope;
        this.status = status;
    }
}