export class CandidateMailEntity {
    public candidate_mail_id: number;
    public mail_date: string;
    public sent_status: string;
    public status: string;

    constructor(candidate_mail_id?: number, mail_date?: string, sent_status?: string, status?: string) {
        this.candidate_mail_id = candidate_mail_id;
        this.mail_date = mail_date;
        this.sent_status = sent_status;
        this.status = status;
    }
}