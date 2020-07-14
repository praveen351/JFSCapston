import { CandidateEntity } from './candidateentity';

export class CandidateMail {
    public selectedCandidate: CandidateEntity[];

    constructor(selectedCandidate: CandidateEntity[]) {
        this.selectedCandidate = selectedCandidate;
    }
}