
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


declare var Howl:any;

interface LoadStep {
  step: number;
  total: number;
}


@Injectable()
export class SoundFXService {

  private audios: {[key:string]:any} = {};
  private loader:number = 0;
  private _loaded:number = 0;
  private total:number = 0;
  private pending:string[];
  public subject: BehaviorSubject<LoadStep>;


  add(file:string[]) {
   this.pending = file;
   this.total += file.length;
  }

  preload():BehaviorSubject<LoadStep> {
    this.subject = new BehaviorSubject<LoadStep>({
      step: 0,
      total: this.total
    });
    this.pending.forEach(v => {
      console.log(v);
      this.audios[v] = new Howl({
        src: [v],
        onload: () => {
          this._loaded++;
          this.subject.next(
            {step: this._loaded, total: this.total}
          )
          if(this._loaded == this.total) {
            // @TODO emit complete
            this.subject.complete();
            // this.subject.dispose();
          }
        }
      });
      this.pending = [];
    });
    return this.subject;
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
