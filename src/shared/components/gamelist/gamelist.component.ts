import { Component, Input } from '@angular/core';

import { Joc } from '../../../models/joc';


@Component({
  selector: 'app-game-list',
  templateUrl: 'gamelist.component.html',
  styleUrls: ['./gamelist.component.scss']
})
export class TiGameListComponent {

  @Input()
  jocs: Joc[] = [];

  @Input()
  user: string = '';

  constructor() { }

}
