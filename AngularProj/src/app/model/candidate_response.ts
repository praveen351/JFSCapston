export class CandidateResponse {
    public question: string;
    public responseoptions: string;
    public responsescope: string;
    public responsetype: string;

    constructor(question?: string, responseoptions?: string, responsescope?: string, responsetype?: string) {
        this.question = question;
        this.responseoptions = responseoptions;
        this.responsescope = responsescope;
        this.responsetype = responsetype;
    }
}