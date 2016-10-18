import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import * as firebase from 'firebase';

export class Word {
  public id:number
  public label: string;
  public image: string;
  public audio: string;
}


@Injectable()
export class WordsService {

  private endpoint:string

  constructor(private http: Http) {
    // console.log(environment);
    this.endpoint = environment.wordsEndpoint
  }

  getWords(): Observable<Word[]> {
    return this.http
      .get(this.endpoint)
      .map((r: Response) => r.json() as Word[]);
  }

  getGame(uid:string, id:string):Observable<any> {
    return Observable.fromPromise(
      firebase.database().ref(this.gamePath(uid, id))
        .once('value') as Promise<any>
    )
  }

  gamePath(uid:string, id:string):string {
    return `users/${uid}/jocs/${id}`;
  }


}
