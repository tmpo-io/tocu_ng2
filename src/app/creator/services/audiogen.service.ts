import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class AudioGenService {
  constructor(private http: Http) { }

  createAudio(uid:string, wuid:string, word:string) {
    const url:string = environment.audioEndpoint;

    const query = `?w=${word}&uid=${uid}&wid=${wuid}`

    this.http.get(url + query).subscribe(
      ()=>{ console.log('progress') },
      err => { console.log('error', err) }
    )

  }

}
