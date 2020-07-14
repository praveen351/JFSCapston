import { SurveyDetailEntity } from './surveydetailentity';

export class CandidateResponseEntity {
    public candidate_res_id: number;
    public surveydetailentity: SurveyDetailEntity;
    public candidate_response: string;
    public status: string;

    constructor(candidate_res_id?: number, surveydetailentity?: SurveyDetailEntity, servey_name?: string, opening_date_time?: string, closing_date_time?: string, no_of_question?: number, no_of_candidate?: number, status?: string) {
        this.candidate_res_id = candidate_res_id;
        this.surveydetailentity = surveydetailentity;
        this.status = status;
    }

}