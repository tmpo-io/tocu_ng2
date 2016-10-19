
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// declare var Image:any;

@Injectable()
export class ImageLoader {

  private images:string[]
  private total:number = 0;

  constructor(private http: Http) {}

  add(file:string[]):Observable<number> {
    this.images = file;
    this.total = file.length;
    return this.preload() as Observable<number>;
  }

  preload():EventEmitter<number> {
    let sub = new EventEmitter<number>();
    let loaded = 1;
    this.images.forEach(img=>{
      this.http.get(img, {}).subscribe(()=>{
        loaded++;
        sub.next(loaded);
        if(loaded > this.total) {
          console.log("[SRVIL] complete")
          sub.complete();
        }
      })
    });
    return sub;
  }

}
