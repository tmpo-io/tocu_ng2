import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  Input, NgZone, OnInit, OnDestroy
} from '@angular/core';

// import * as Pixi from 'pixi.js';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Point  } from 'pixi.js';

import { getRandomIntColor } from '../../colors';
import { PixiBase } from '../../pixi/base';
import { Ball } from '../../pixi/ball';


@Component({
  selector: 'ti-canvasexplosion',
  template: `<div></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiCanvasExplosionComponent extends PixiBase implements OnInit, OnDestroy {

  sub$: Subject<number> = new Subject<number>();
  dest$: Subject<boolean> = new Subject<boolean>();

  balls: Ball[] = [];

  constructor(ngZone: NgZone, el: ElementRef) {
    super(ngZone, el);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  pixiReady() {

    this.ngZone.runOutsideAngular(() => {
      Observable.interval(20)
        .takeUntil(this.dest$)
        .subscribe(this.sub$);
      Observable.interval(300)
        .take(5)
        .takeUntil(this.dest$)
        .subscribe(() => {
            this.addBalls();
        });
    });

  }

  addBalls() {

    let mov = function (x) {
      this.y += this.speed;
      // this.width -= Math.sin((this.seed + x)) * 2;
      this.x += Math.sin((this.seed + x) / 10);
      if (this.y > 1500) {
        this.destroy();
      }
    };

    for (let i = 0; i < 30; i++) {
      let b = new Ball(10, getRandomIntColor());
      let s = 1 + (Math.random() * 2);
      b.scale = new Point(s, s);
      b.x = Math.random() * this.width;
      b.y = -50;
      // this.balls.push(b);
      this.stage.addChild(b);
      b.animate(this.sub$, mov);
    }

  }

  onDestroy() {
    // console.log('on destroy');
    this.dest$.next(true);
    this.stage.destroy();
    // this.ngOnDestroy();
  }

}
