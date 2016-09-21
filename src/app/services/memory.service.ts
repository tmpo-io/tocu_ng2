import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';



import { Card } from '../memory/card/card';


@Injectable()
export class MemoryService {

  private endpoint:string

  constructor(private http: Http) {
    console.log(environment);
    this.endpoint = environment.memoryEndpoint
  }

  getWords(): Observable<Card[]> {
    return this.http
      .get(this.endpoint)
      .map((r: Response) => r.json().data as Card[]);
  }


}
