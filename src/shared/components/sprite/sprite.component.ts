import {
  Component, OnInit,
  Input, OnDestroy, Renderer,
  AfterViewInit, ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/takeUntil';

// Step is a frame, duration
export type Step = [number, number];

@Component({
  selector: 'app-ti-sprite',
  template: `<div #ref
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
export class TiSpriteComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() width: number;
  @Input() height: number;
  @Input() sprite: string;
  @Input() steps: Step[];
  @Input() repeat: number = Number.POSITIVE_INFINITY;

  @ViewChild('ref') el;

  st$: Observable<number>;
  destroy: Subject<any> = new Subject();
  public bpos: number = 1;

  public a: number;

  constructor(private render: Renderer) { }

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
        console.log('value', a);
        this.bpos = -((a - 1) * this.width);
      });
  }

  ngAfterViewInit() {
    this.render.setElementStyle(
      this.el.nativeElement, 'width', this.width + 'px'
    );
    this.render.setElementStyle(
      this.el.nativeElement, 'height', this.height + 'px'
    );
  }

  ngOnDestroy() {
    console.log('Should destroy');
    this.destroy.next();
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
