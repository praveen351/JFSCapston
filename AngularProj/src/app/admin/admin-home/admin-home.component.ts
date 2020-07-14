import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  offToggle: boolean;
  onToggle: boolean;
  secOffTogle: boolean;
  switchNavhome: boolean;
  mobileQuery: MediaQueryList;
  loopCtrlData: any[] = [];
  currentPageName: string;

  loopSurvey: string[] = ['Add Survey', 'Add Survey Question', 'Add Candidate', 'Send Candidate Mail', 'Candidate Chart'];
  loopIconName: string[] = ['meeting_room', 'question_answer', 'import_contacts', 'contact_mail', 'insert_chart'];
  looprouterLink: string[] = ['addSurvey', 'addSurveyDetail', 'addCandidate', 'sendCandidateMail', 'showStatitics'];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.offToggle = false;
    this.onToggle = true;
    this.secOffTogle = false;
    this.switchNavhome = true;

    let basedata = 9;
    this.currentPageName = "Home Page"

    for (let i = 0; i < 5; i++) {
      this.loopCtrlData.push({
        dataText: this.loopSurvey[i],
        routerLink: this.looprouterLink[i],
        iconname: this.loopIconName[i],
        matcardmleft: (basedata + i * 260).toString().concat('px'),
      });
    }

  }
}
