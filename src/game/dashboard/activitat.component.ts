import { Component, Input, Output, EventEmitter } from '@angular/core';


import { Dashboard } from '../../models/dashboard';
import { User } from '../../models/user';


@Component({
  selector: 'app-activitat',
  templateUrl: './activitat.component.html',
  styleUrls: ['./activitat.component.scss'],
})
export class ActivitatComponent {

  @Input() dashboard: Dashboard = {};
  @Input() user: User = {};

  @Output() dashClick: EventEmitter<any> = new EventEmitter();

}
