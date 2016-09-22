
import { Injectable } from '@angular/core';

import { Howl } from 'howler';


@Injectable()
export class SoundFXService {

  private audios: {[key:string]:Howl} = {};
  private loader:number = 0;
  private _loaded:number = 0;
  private total:number = 0;
  private pending:string[];


  add(file:string[]) {
   this.pending = file;
   this.total += file.length;
  }

  preload():void {
    this.pending.forEach(v => {
      this.audios[v] = new Howl({
        urls: [v],
        onload: () => {
          this._loaded++;
          if(this._loaded == this.total) {
            // @TODO emit complete
          }
        }
      });
      this.pending = [];
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

  get(w:string):Howl {
    return this.audios[w];
  }

  loaded():number {
    return this._loaded;
  }


}
