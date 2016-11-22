import { Component,
  EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../models/user';
import { Dashboard } from '../../models/dashboard';


@Component({
  selector: 'app-dash-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class DashWelcomeComponent {

  @Input()
  public user: User;

  @Input()
  state: Dashboard;

  @Output()
  public subscribe: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }


}
