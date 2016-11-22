import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../models/app';
import { GameSession } from '../../models/gamesession';
import { getGameSession } from '../gamesession.reducers';
import { GSActions } from '../gamesession.actions';

@Component({
  selector: 'app-user-dash',
  template: `
    <app-user-dashboard [gamesession]="game$ | async"></app-user-dashboard>
  `
})
export class UserDashComponent {

  game$: Observable<GameSession>;

  constructor(public store$: Store<AppState>) {

    this.game$ = store$
      .let(getGameSession())
      .map((g: GameSession) => {
        if (g.loadJocs === 'notready') {
          store$.dispatch(GSActions.load(g.userID));
        }
        let games = g.jocs.filter(g => g.published);
        return Object.assign({}, g, {jocs:games});
      });

  }

}
