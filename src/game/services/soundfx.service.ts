
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';


declare var Howl: any;


@Injectable()
export class SoundFXService {

  private audios: {[key: string]: any} = {};
  private _loaded: number = 0;
  private total: number = 0;
  private pending: string[];

  constructor( private zone: NgZone ) {}

  add(file:string[]): Observable<number> {
  //  console.log("[sndfx] add:" + file );
   this.pending = file;
   this.total = file.length;
   return this.preload();
  }

  preload(): Observable<number> {
    this._loaded = 0;
    return new Observable<number>((obs) => {
      this.pending.forEach(v => {
        this.audios[v] = new Howl({
          src: [v],
          format: 'mp3',
          onload: () => this.zone.run(() => {
            this._loaded++;
            obs.next(this._loaded);
            if (this._loaded === this.total) {
              console.log('[SRVFX] sound complete');
              obs.complete();
            }
          })
        });
      });
      return () => {
        // console.log("[SNDFX] observer callback called");
       };
    });
  }

  remove(files: string[]) {
    files.forEach(v => {
      if (v in this.audios) {
        // @TODO check if onload events are cleaned
        this.audios[v].unload();
      }
      delete this.audios[v];
    });
    this.total -= files.length;
    this._loaded -= files.length;
  }

  play(which: string) {
    this.audios[which].play();
  }

  stop(which: string) {
    this.audios[which].stop();
  }

  get(w: string): any {
    return this.audios[w];
  }

  loaded(): number {
    return this._loaded;
  }

  delete(audio: string): void {
    if (!(audio in this.audios)) {
      return;
    }
    this.audios[audio].unload();
    delete this.audios[audio];
    this.total -= 1;
  }

  unload(): void {
    Object.keys(this.audios).map(a => {
      this.audios[a].unload();
      delete this.audios[a];
    });
  }


}
