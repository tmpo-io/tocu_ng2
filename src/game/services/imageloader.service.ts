
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

declare var Image:any;

@Injectable()
export class ImageLoader {

  private images:string[]
  private total:number = 0;

  constructor(private http: Http) {}

  add(file:string[]) {
    this.images = file;
    this.total = file.length;
  }

  preload():EventEmitter<number> {
    let sub = new EventEmitter<number>();
    let loaded = 1;
    this.images.forEach(img=>{
      this.http.get(img, {}).subscribe(()=>{
        loaded++;
        sub.next(loaded);
        if(loaded == this.total) {
          sub.complete();
        }
      })
      // let i = new Image();
      // i.onload = ()=> {
      //   sub.emit(loaded);
      //   if(loaded==this.total) {
      //     sub.complete();
      //   } else {
      //     loaded++;
      //   }
      // }
      // i.src = img;
    });
    return sub;
  }

}
