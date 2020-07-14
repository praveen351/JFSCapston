import { Survey } from './surveyentity';

export class SurveyData {
    public survey: Survey;
    public selected: boolean;

    constructor(survey: Survey, selected: boolean) {
        this.survey = survey;
        this.selected = selected;
    }
}