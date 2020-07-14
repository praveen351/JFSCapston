import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-candidate',
  templateUrl: './confirm-candidate.component.html',
  styleUrls: ['./confirm-candidate.component.css']
})
export class ConfirmCandidateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    if (sessionStorage.getItem('activeData') == undefined) {
      this.router.navigateByUrl('candidate/loginCandidate');
    }

  }

}
