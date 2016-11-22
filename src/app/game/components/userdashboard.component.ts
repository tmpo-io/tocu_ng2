import { Component, Input } from '@angular/core';

import { GameSession } from '../../models/gamesession';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserDashboardComponent {

  @Input()
  gamesession: GameSession;

  constructor() { }

}
