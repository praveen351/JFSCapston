import { Component, OnInit, EventEmitter, Input, Output, SimpleChange, OnChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-survey-value-child',
  templateUrl: './survey-value-child.component.html',
  styleUrls: ['./survey-value-child.component.css']
})
export class SurveyValueChildComponent implements OnInit, OnChanges {
  @Input() survey_name: string;
  @Input() selected: boolean;
  @Input() survey_id: number;

  @Input() view_btn_ctrl: boolean;
  @Input() delete_btn_ctrl: boolean;
  @Input() update_btn_ctrl: boolean;
  @Input() add_btn_ctrl: boolean;

  @Output() survey_handler = new EventEmitter<string>();
  @Output() edit_handler = new EventEmitter<void>();
  @Output() remove_handler = new EventEmitter<void>();
  @Output() view_handler = new EventEmitter<void>();
  @Output() add_handler = new EventEmitter<void>();

  mart_cardcolor: string;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor() { }

  ngOnInit(): void {
    this.mart_cardcolor = 'white';
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        console.log(propName + ' ' + to);

      } else {
        let from = JSON.stringify(changedProp.previousValue);
        console.log(from + ' ' + to);
        if (to === 'true')
          this.mart_cardcolor = '#DEF9CE';
        else
          this.mart_cardcolor = 'white';
      }
    }
  }
  clickhoever(event: any) {
    event.target.style.cursor = 'pointer';
  }
  sendSurveyID() {
    this.survey_handler.emit((this.survey_id).toString());
  }
  onRightClick(event: MouseEvent) {
    if (this.mart_cardcolor == '#DEF9CE') {
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
    // event.preventDefault();

  }

  editData() {
    this.edit_handler.emit();
  }
  deleteData() {
    this.remove_handler.emit();
  }
  viewData() {
    this.view_handler.emit();
  }
  addData() {
    this.add_handler.emit();
  }
}