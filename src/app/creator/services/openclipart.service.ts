import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const translator = environment.translatorEndpoint;
const oClipart = environment.clipArtEndpoint;


export class Clipart {
  public thumb: string;
  public url: string;
  public score: number;
  public downloaded: number;
}

export class Translated {
  public catala: string;
  public castellano: string;
  public english: string;
}


@Injectable()
export class OpenClipartService {

  constructor(private http: Http) {}

  getCliparts(word): Observable<Clipart[]> {
    const ffilter = function (r: Response) {
      let res: Clipart[] = [];
      r.json().payload.forEach((item) => {
        res.push({
          thumb: item.svg.png_thumb,
          url: item.svg.png_full_lossy,
          score: item.total_favorites,
          downloaded: item.downloaded_by
        });
      });
      return Observable.from(res);
    };
    let compare = function (a, b) {
      if (a.downloaded_by < b.downloaded_by) {
        return -1;
      }
      if (a.downloaded_by > b.downloaded_by) {
        return 1;
      }
      return 0;
    };
    return this.http
      .get(translator + `?w=${word}`)
      .flatMap((r: Response) => {
        let m = r.json() as Translated;
        // Start spanish request
        let a = this.http
          .get(oClipart + m.castellano)
          .flatMap(ffilter);

        // Start english request
        let b = this.http
          .get(oClipart + m.english)
          .flatMap(ffilter);

        return a.concat(b)
          .distinct((x, y) => {
            return x.url == y.url;
          })
          .toArray()
          .map(arr => arr.sort(compare));

      });
  }

}
