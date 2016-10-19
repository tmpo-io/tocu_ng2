
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';


declare var Howl:any;


@Injectable()
export class SoundFXService {

  private audios: {[key:string]:any} = {};
  private loader:number = 0;
  private _loaded:number = 0;
  private total:number = 0;
  private pending:string[];
  // public subject: EventEmitter<number>;

  constructor( private zone:NgZone ){}

  add(file:string[]):Observable<number> {
  //  console.log("[sndfx] add:" + file );
   this.pending = file;
   this.total = file.length;
   return this.preload();
  }

  preload():Observable<number> {
    const pend = this.pending.slice();
    this._loaded = 0;
    // this.subject = new EventEmitter<number>();
    return Observable.create((obs)=>{
      this.pending.forEach(v => {
        // console.log("Audios", v);
        this.audios[v] = new Howl({
          src: [v],
          format: "mp3",
          onload: ()=> this.zone.run(() => {
            this._loaded++;
            obs.next(this._loaded)
            if(this._loaded == this.total) {
              console.log("[SRVFX] sound complete");
              obs.complete();
            }
          })
        });
      });

      return ()=> {
        pend.forEach((v)=>{
          if(v in this.audios) {
            this.audios[v].unload();
          }
          delete this.audios[v];
        });
        this.total = 0;
      }
    });
  }

  remove(files:string[]) {
    files.forEach(v => {
      if(v in this.audios) {
        // @TODO check if onload events are cleaned
        this.audios[v].unload();
      }
      delete this.audios[v];
    });
    this.total -= files.length;
    this._loaded -= files.length;
  }

  play(which:string) {
    this.audios[which].play();
  }

  stop(which:string) {
    this.audios[which].stop();
  }

  get(w:string):any {
    return this.audios[w];
  }

  loaded():number {
    return this._loaded;
  }


}
