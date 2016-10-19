
import { Injectable } from '@angular/core';
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
    return this.preload();
  }

  preload():Observable<number> {
    return new Observable<number>((obs)=>{
      let loaded = 0;
      this.images.forEach(img=>{
        this.http.get(img, {}).subscribe(()=>{
          loaded++;
          obs.next(loaded);
          if(loaded == this.total) {
            console.log("[SRVIL] complete")
            obs.complete();
          }
        })
      });
      return ()=> {
        console.log("[IMGSRV] callback cancel called");
      }
    });
  }
}
