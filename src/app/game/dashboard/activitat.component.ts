import { Component, Input, Output, EventEmitter } from '@angular/core';



import { Router } from '@angular/router';

import { Dashboard } from '../../models/dashboard';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { Joc } from '../../models/joc';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  state,
  style, transition,
  animate, trigger
} from '@angular/core';


@Component({
  selector: 'app-activitat',
  templateUrl: './activitat.component.html',
  styleUrls: ['./activitat.component.scss']
})
export class ActivitatComponent {

  constructor(
    public router: Router,
    private modal: NgbModal) { }

  @Input() dashboard: Dashboard;
  @Input() user: User;

  @Output()
  dashClick: EventEmitter<any> = new EventEmitter();

  @Output()
  deleteMsg: EventEmitter<Message> = new EventEmitter<Message>();

  @Output()
  logout: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  changeUser: EventEmitter<boolean> = new EventEmitter<boolean>();

  navigate(url) {
    this.router.navigate(url);
    return false;
  }

  getJocs(): Joc[] {
    if (!this.dashboard.isAdmin) {
      return this.dashboard.jocs.filter(k => k.published);
    }
    return this.dashboard.jocs;
  }

  open(content) {
    this.modal.open(content);
  }

  validLogin() {
    this.changeUser.next(true);
  }

}
