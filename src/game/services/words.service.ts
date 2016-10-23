import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

import { environment } from '../../environments/environment';

import * as firebase from 'firebase';

import { Word } from '../../models/word';
import { Joc } from '../../models/joc';

@Injectable()
export class WordsService {

  private endpoint: string;

  constructor(private http: Http) {
    // console.log(environment);
    this.endpoint = environment.wordsEndpoint;
  }

  getWords(): Observable<Word[]> {
    return this.http
      .get(this.endpoint)
      .map((r: Response) => r.json() as Word[]);
  }

  getGame(uid: string, id: string): Observable<any> {
    return Observable.fromPromise(
      firebase.database().ref(this.gamePath(uid, id))
        .once('value') as Promise<any>
    );
  }

  // Checks on DB if game exists
  gameExists(uid: string, id: string): Observable<boolean> {
    return Observable.fromPromise(
        firebase.database().ref(this.gamePath(uid, id))
        .once('value') as Promise<any>
      ).switchMap(
        (snap): Observable<boolean> => {
          if (snap.val() !== null) {
            return of(true);
          }
          return of(false);
      });
  }

  loadGames(uid: string): Observable<Joc[]> {
    return new Observable<Joc[]>((observer) => {
      const path = `users/${uid}/jocs/`;
      // console.log(path);
      firebase.database().ref(path)
        .orderByChild('published')
        .equalTo(true)
        .once('value', (snap) => {
          let vals = snap.val();
          let arr = Object.keys(vals)
            .map((k) => vals[k]);
          observer.next(arr);
      });
    });
  }

  gamePath(uid: string, id: string): string {
    return `users/${uid}/jocs/${id}`;
  }


}
