
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import * as Pixi from 'pixi.js';




const SPEED = 25;


export class Ball extends Pixi.Graphics {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  public speed: number;
  public seed: Number;

  constructor(radius: number, color: any) {
    super();
    this.lineStyle(0);
    this.beginFill(color);
    this.drawCircle(0, 0, radius);
    this.endFill();
    this.speed = 6 + Math.round(Math.random() * 10);
    this.seed = Math.round(Math.random() * 180);
  }

  animate(obs: Observable<number>, fn: any) {
    obs.takeUntil(this.destroy$).subscribe((x) => {
      fn.call(this, x);
    });
  }

  // explode(duration: number) {
  //   let d = duration / SPEED;
  //   let init = this.getProps();
  //   let out = {
  //     x: -100 + Math.random() * 200,
  //     y: -100 + Math.random() * 200,
  //     alpha: 1
  //   }
  //   Observable.interval(SPEED)
  //     .take(d)
  //     .map((t) => {
  //       // console.log(inOutSin(t, init.alpha, out.alpha, d));
  //       return {
  //         x: inOutSin(t, init.x, out.x, d),
  //         y: inOutSin(t, init.y, out.y, d),
  //         alpha: inOutSin(t, init.alpha, out.alpha, d)
  //       };
  //     })
  //     .takeUntil(this.destroy$)
  //     .concat(Observable.of(out))
  //     .subscribe((k) => {
  //       // console.log(k);
  //       this.x = k.x;
  //       this.y = k.y;
  //       this.alpha = 1 - k.alpha;
  //     });
  // }




  getProps() {
    return Object.assign({}, {
      x: this.x,
      y: this.y,
      alpha: 0
    });
  }

  destroy() {
    // console.log('Element destroyed');
    this.destroy$.next(true);
    super.destroy();
  }

}


export function inOutSin(t: number, b: number, c: number, d: number): number {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
