import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import { Dashboard } from '../../models/dashboard';
import { User } from '../../models/user';
import { Message } from '../../models/message';


@Component({
  selector: 'app-activitat',
  templateUrl: './activitat.component.html',
  styleUrls: ['./activitat.component.scss']
})
export class ActivitatComponent {

  constructor(public router: Router)  {}

  @Input() dashboard: Dashboard = {};
  @Input() user: User = {};

  @Output()
  dashClick: EventEmitter<any> = new EventEmitter();

  @Output()
  deleteMsg: EventEmitter<Message> = new EventEmitter<Message>();

  @Output()
  logout: EventEmitter<boolean> = new EventEmitter<boolean>();


  navigate(url) {
    this.router.navigate(url);
    return false;
  }


}
