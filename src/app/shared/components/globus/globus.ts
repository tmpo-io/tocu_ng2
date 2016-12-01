
import { EventEmitter } from '@angular/core';
import { ObservablePoint, Sprite,
    Texture, Point } from 'pixi.js';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import { animationFrame } from 'rxjs';
// import 'rxjs/scheduler/animationFrame';
// import { animationFrame } from 'rxjs/sch';



import { getRandomIntColor } from '../../colors';

export function noob() { }

export class Globus extends Sprite {

  static image = '/assets/img/globus.png';
  animator$ = Observable.interval(18);
  cancel$ = new Subject<boolean>();
  speed: number = 1;
  output: EventEmitter<boolean>;

  constructor() {
    super(Texture.fromImage(Globus.image));
    this.setColor();
    this.anchor = new ObservablePoint(noob, this, 0.5, 0.5);
    this.x = 300;
    this.y = 700;
    this.speed = Math.round(2 + Math.random() * 8);
    let scale = 0.4 + Math.random();
    this.scale = new Point(scale, scale);
    this.animator$
      .takeUntil(this.cancel$)
      .subscribe((frame) => {
        this.animate(frame);
      });
    this.interactive = true;
    this.on('mousedown', this.click.bind(this));
    this.on('touchstart', this.click.bind(this));

  }

  click(ev) {
    this.output.next(true);
    this.destroy();
    // console.debug(ev);
    ev.stopPropagation();
    return false;
  }

  setColor() {
    this.tint = getRandomIntColor();
  }

  animate(fr: number) {
    this.rotation = 0 + (Math.sin(fr / 20) * 10)
      * Math.PI / 180;
    this.y -= this.speed;
    if (this.y < -500) {
      this.destroy();
    }
  }

  destroy() {
    // console.log('element destroyed');
    this.cancel$.next(true);
    super.destroy();
  }


}
