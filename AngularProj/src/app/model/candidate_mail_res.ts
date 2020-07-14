export class CandidateMailResponse {
    public candidate_id: number;
    public mail_sent_status: string;

    constructor(candidate_id?: number, mail_sent_status?: string) {
        this.candidate_id = candidate_id;
        this.mail_sent_status = mail_sent_status;
    }
}