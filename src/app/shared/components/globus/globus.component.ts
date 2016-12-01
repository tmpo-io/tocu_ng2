import {
  Component, OnInit, OnDestroy,
  ElementRef, NgZone, EventEmitter
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/interval';

// import { animationFrame } from 'rxjs';
// import { animationFrame } from 'rxjs';

import { FxService } from '../../../fx/fx.service';
import { PixiBase } from '../../pixi/base';
import { Globus } from './globus';


@Component({
  selector: 'app-globus',
  template: `<div></div>`,
  styles: ['']
})
export class GlobusComponent extends PixiBase implements OnInit, OnDestroy {

  dest$ = new Subject<boolean>();
  generator$ = Observable.interval(400);
  emmit$ = new EventEmitter<boolean>();
  subs: Subscription;

  constructor(ngZone: NgZone, el: ElementRef,
    private fx: FxService) {
    super(ngZone, el);
  }


  pixiReady() {
    // let gl = new Globus();
    // this.stage.addChild(gl);
    // console.log('ready');
    this.generator$
      .takeUntil(this.dest$)
      .take(100)
      .subscribe(() => {
        this.addBalloons();
      });
    this.subs = this.emmit$.subscribe(() => {
      this.fx.play('/assets/fx/click.mp3');
    });
  }

  addBalloons() {
    // console.log('add balloons');
    let gl = new Globus();
    gl.x = 50 + Math.round(Math.random() * (this.width - 100));
    gl.y = this.height + 200;
    gl.output = this.emmit$;
    this.stage.addChild(gl);
  }

  ngOnInit() {
    this.fx.load('/assets/fx/click.mp3');
    super.ngOnInit();
  }

  ngOnDestroy() {
    this.dest$.next(true);
    super.ngOnDestroy();
  }


}
