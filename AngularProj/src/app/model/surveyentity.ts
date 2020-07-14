import { SurveyDetailEntity } from './surveydetailentity';
import { CandidateEntity } from './candidateentity';

export class Survey {
    public surveyid: number;
    public survey_detail_list: SurveyDetailEntity[];
    public candidate_list: CandidateEntity[];
    public servey_name: string;
    public opening_date_time: string;
    public closing_date_time: string;
    public no_of_question: number;
    public no_of_candidate: number;
    public status: string;

    constructor(surveyid?: number, survey_detail_list?: SurveyDetailEntity[], candidate_list?: CandidateEntity[], servey_name?: string, opening_date_time?: string, closing_date_time?: string, no_of_question?: number, no_of_candidate?: number, status?: string) {
        this.surveyid = surveyid;
        this.survey_detail_list = survey_detail_list;
        this.candidate_list = candidate_list;
        this.servey_name = servey_name;
        this.opening_date_time = opening_date_time;
        this.closing_date_time = closing_date_time;
        this.no_of_question = no_of_question;
        this.no_of_candidate = no_of_candidate;
        this.status = status;
    }
}