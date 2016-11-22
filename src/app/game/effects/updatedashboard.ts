
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/services/auth-service';
import { cleanObject } from '../../shared/utils';
import 'rxjs/add/observable/forkJoin';


export function copyGamesFromStarter(auth: AuthService, db: any) {
  return state$ =>
    state$.switchMap(() => {
      return getBaseGames(db)
        .switchMap(createGames(auth, db))
        .switchMap(storeWords(auth, db));
    });
}

export function storeWords(auth, db) {
  return games => {
    let words = {};
    games.forEach((g) => {
      g.words.forEach((w) => {
        words[w.id] = cleanObject(w);
      });
    });
    // console.log(words);
    return Observable.fromPromise(
      db.object(`users/${auth.id}/words`).set(words) as Promise<any>
    ).take(1);
  };
}

export function createGames(auth, db) {
  return games => {
    console.log('create games', games);
    return Observable.forkJoin(
      games.map(storeGame(auth, db)), (x, y) => games
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

