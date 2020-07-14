import { CandidateResponseEntity } from './candidaterepositoryentity';
import { CandidateMailEntity } from './candidatemail';

export class CandidateEntity {
    public candidate_id: number;
    public candidate_response_list: CandidateResponseEntity[];
    public candidate_mail_list: CandidateMailEntity[];
    public candidate_name: string;
    public candidate_email: string;
    public response_date: string;
    public open_time: string;
    public close_time: string;
    public status: string;

    constructor(candidate_id?: number, candidate_response_list?: CandidateResponseEntity[], candidate_mail_list?: CandidateMailEntity[], candidate_name?: string, candidate_email?: string, response_date?: string, open_time?: string, close_time?: string, status?: string) {
        this.candidate_id = candidate_id;
        this.candidate_response_list = candidate_response_list;
        this.candidate_mail_list = candidate_mail_list;
        this.candidate_name = candidate_name;
        this.candidate_email = candidate_email;
        this.response_date = response_date;
        this.open_time = open_time;
        this.close_time = close_time;
        this.status = status;
    }
}