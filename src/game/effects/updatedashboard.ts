
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/services/auth-service';
import { cleanObject } from '../../shared/utils';



export function copyGamesFromStarter(auth: AuthService, db: any) {
  return state$ =>
    state$.switchMap(() => {
      return getBaseGames(db).map(createGames(auth, db));
    });
}


export function createGames(auth, db) {
  return games => {
    console.log('create games', games);
    return Observable.merge(
      games.map( storeGame(auth, db) )
    );
  };
}

export function storeGame(auth, db) {
  return game =>
    Observable.fromPromise(
      db.object(`users/${auth.id}/jocs/${game.id}/`)
        .set(cleanObject(game)) as Promise<any>
    );
}

function getBaseGames(db: any) {
  return db.list('starter');
}

