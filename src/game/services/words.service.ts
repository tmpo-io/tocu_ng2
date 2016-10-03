import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';



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
    console.log(environment);
    this.endpoint = environment.wordsEndpoint
  }

  getWords(): Observable<Word[]> {
    return this.http
      .get(this.endpoint)
      .map((r: Response) => r.json() as Word[]);
  }


}
