import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/concat';

// Step is a frame, duration
export type Step = [number, number];

@Component({
  selector: 'app-ti-sprite',
  template: `Sprite {{ a }}`
})
export class TiSpriteComponent implements OnInit {

  @Input() width: number;
  @Input() height: number;
  @Input() sprite: string;
  @Input() steps: Step[];

  st$: Observable<number>;
  sub: any;

  public a:number;

  constructor() { }

  ngOnInit() {
    this.st$ = steper$(this.steps);
    this.sub = this.st$.subscribe((a) => {
      console.log('value', a);
    });
  }


}


export function steper$(a: Step[]): Observable<number> {

  // Observable.of(1).concat(
  //   Observable.timer(1000).mapTo(2)
  // );

  let chain$;
  for (let i = 0; i < a.length; i++) {
    if (i === 0) {
      chain$ = Observable.of(a[i][0]);
    } else {
      chain$ = chain$.concat(
        Observable.timer(a[i - 1][1]).mapTo(a[i][0])
      );
    }
  }

  return chain$;

}
