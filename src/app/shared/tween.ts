
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import { animationFrame } from 'rxjs/scheduler/animationFrame';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';

import { Easing } from './easing';

export interface Poperties {
  easing?: any;
}


@Injectable()
export class TmpoTweenService {

  // cancel$ is a subject available for canceling
  // tweens in course
  cancel$: Subject<boolean> = new Subject<boolean>();
  // Rate express the framerate in ms, at which the
  // tween will update. we desire 60fps
  rate = 50;

  // defaultEasing
  defaultEasing = Easing.linear;

  // Returns the initial observable without easing conversions
  // to tween to someting
  public toObservable(speed: number): Observable<number> {
    const steps = speed / this.rate;
    return Observable
      .interval(this.rate)
      .takeUntil(this.cancel$)
      .take(steps);
  }

  // to will tween properties of el, with duration and expressed with
  // props. More or less mimics the Tweenlite api.
  // <T>(arg: T): T
  public to<T extends Poperties>(el: T, duration: number, props: T): Observable<T> {

    let stre$ = this.toObservable(duration);
    let keys = Object.keys(props);
    let easing = this.defaultEasing;
    // Easing should be pased as a property of props
    if ('easing' in props) {
      easing = props.easing;
      delete props.easing;
    }

    let initial = {};
    keys.forEach((a) => initial[a] = el[a]);

    let change = {};
    keys.forEach((a) => change[a] = props[a] - initial[a]);

    let speed = duration / this.rate;
    return stre$
      .map(x => x + 1)
      .map((x) => {
        let t = {};
        keys.forEach((k) => {
          t[k] = easing(x, initial[k], change[k], speed);
        });
        return t;
      }) as Observable<T>;
  }
  // stops all tweens in progrress
  public stopAll() {
    this.cancel$.next(true);
  }


}
