

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import { Graphics } from 'pixi.js';
import { Point } from 'pixi.js';

// import * as Pixi from 'pixi.js';
import { getColorNum } from '../../shared/colors';

import { IPoint } from './lletres.state';

export type Pstate = 'waiting' | 'current'
  | 'next' | 'completed' | 'error';


let colorStates = {
  waiting: 'gris',
  current: 'verd',
  next: 'blau',
  completed: 'verd_fosc',
  error: 'vermell'
};


export class Punt extends Graphics {

  state: Pstate = 'waiting';
  // color: number;
  radius: number = 30;
  index: number = 0;

  animateIntro = true;
  changes$: Subject<Pstate> = new Subject<Pstate>();
  animator$: Observable<number>;


  constructor(p: IPoint, index?: number) {
    super();
    this.index = index;
    this.x = p.x;
    this.y = p.y;
    this.interactive = true;
  }

  init() {
    this.draw();
    if (this.animateIntro) {
      this.animIn$();
    }

    this.changes$
      .subscribe((s: Pstate) => {
        this.draw();
        if (s === 'next') {
          this.blink$();
        }
      });
  }


  setState(state: Pstate) {
    this.state = state;
    this.changes$.next(state);
  }

  draw() {
    this.clear();
    this.lineStyle(0);
    this.beginFill(this.color);
    this.drawCircle(0, 0, this.radius);
    this.endFill();
  }

  get color(): number {
    return getColorNum(colorStates[this.state]);
  }

  blink$() {
    let sc = this.scale.x + 0.1;
    Observable.interval(50)
      .takeUntil(this.changes$)
      .subscribe((i) => {
        let s = sc + (Math.sin(i / 2) * 0.08);
        this.scale = new Point(s, s);
      }, null, () => {
        this.scale = new Point(1, 1);
      });
  }

  animIn$() {
    this.scale = new Point(0, 0);
    Observable.interval(50)
      .delay(this.index * 100)
      .take(10)
      .subscribe((i) => {
        let s = 0.1 * i;
        this.scale = new Point(s, s);
      });
  }

  get point(): Point {
    return new Point(this.x, this.y);
  }

}
