import {
  Component, OnInit,
  Input, OnDestroy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/repeat';


// Step is a frame, duration
export type Step = [number, number];

@Component({
  selector: 'app-ti-sprite',
  template: `<div
      [style.width.px]="width"
      [style.height.px]="height"
      [style.background-position.px]="bpos"
      [ngStyle]="{'background-image': 'url(' + sprite +')'}"
      >
    </div>
    `,
  styles: [
    `
    :host {
      position:relative;
    }
    div {
      position:absolute; display: block;
      top: 0px; left: 0px;
    }`
  ]
})
export class TiSpriteComponent implements OnInit, OnDestroy {

  @Input() width: number;
  @Input() height: number;
  @Input() sprite: string;
  @Input() steps: Step[];
  @Input() repeat: number = Number.POSITIVE_INFINITY;


  st$: Observable<number>;
  destroy: Subject<any> = new Subject();
  bpos: number = 1;

  constructor() { }

  ngOnInit() {
    this.st$ = steper$(this.steps);

    if (this.repeat > 0) {
      this.st$ = this.st$
        .delay(this.steps[this.steps.length - 1][1])
        .repeat(this.repeat);
    }

    this.st$
      .takeUntil(this.destroy)
      .subscribe((a) => {
        this.bpos = -((a - 1) * this.width);
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

}


export function steper$(a: Step[], scheduler: any = null): Observable<number> {

  let chain$;
  for (let i = 0; i < a.length; i++) {
    if (i === 0) {
      chain$ = Observable.of(a[i][0], scheduler);
    } else {
      chain$ = chain$.concat(
        Observable.timer(a[i - 1][1], scheduler).mapTo(a[i][0])
      );
    }
  }
  return chain$;
}
