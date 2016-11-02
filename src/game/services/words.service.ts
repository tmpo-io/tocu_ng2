import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import * as firebase from 'firebase';
import { AngularFire, AngularFireDatabase } from 'angularfire2';


import { Word } from '../../models/word';
import { Joc } from '../../models/joc';

@Injectable()
export class WordsService {

  private endpoint: string;

  constructor(private http: Http, private af: AngularFire) {
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

  gameExists(uid: string, id: string): Observable<boolean> {
    return this.db
      .object(this.gamePath(uid, id))
      .switchMap(j => Observable.of(j.$exists()));
  }

  loadGames(uid: string): Observable<Joc[]> {
    const path = `users/${uid}/jocs/`;
    return this.af.database.list(path, {
      query: {
        orderByChild: 'published',
        equalTo: true
      }
    }).take(1);
  }

  get db(): AngularFireDatabase {
    return this.af.database;
  }

  gamePath(uid: string, id: string): string {
    return `users/${uid}/jocs/${id}`;
  }


}
