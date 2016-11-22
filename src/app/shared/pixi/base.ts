import {
  ElementRef,
  NgZone, OnInit, OnDestroy
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';

// import * as Pixi from 'pixi.js';
import { CanvasRenderer,
    Container, IRendererOptions } from 'pixi.js';

export class PixiBase implements OnInit, OnDestroy {

  public width: number = 100;
  public height: number = 100;

  public canvas: any;
  public render: any;
  public active: boolean = true;
  public stage: Container;

  public shouldResize: boolean = true;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public ngZone: NgZone, public el: ElementRef) { }

  ngOnInit() {
    if (this.shouldResize) {
      Observable.fromEvent(window, 'resize')
        .debounceTime(500)
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.resize();
        });
    }
    this.setSize();
    let opts = Object.assign({}, this.getRenderOptions(), {
      view: this.canvas
    });
    this.render = new CanvasRenderer(this.width, this.height, opts);
    this.el.nativeElement.appendChild(this.render.view);
    this.stage = new Container();
    this.pixiReady();
    this.ngZone.runOutsideAngular(() => {
      this.draw();
    });

  }

  getRenderOptions(): IRendererOptions {
    return {
      transparent: true,
      autoResize: true,
      antialias: true
    };
  }

  pixiReady() {
    throw ('Must be implemented');
  }

  private setSize() {
    this.width = this.el.nativeElement.offsetWidth;
    this.height = this.el.nativeElement.offsetHeight;
  }

  private resize() {
    let width = this.el.nativeElement.offsetWidth;
    let height = this.el.nativeElement.offsetHeight;
    if (!this.stage) {
      return;
    }
    let dw = (this.width - width) / 2;
    let dh = (this.height - height) / 2;
    this.stage.x = - dw;
    this.stage.y = - dh;
    this.width = width;
    this.height = height;
  }

  public onDestroy() { }

  ngOnDestroy() {
    this.active = false;
    this.onDestroy();
    this.destroy$.next(true);
    this.render.destroy();
  }

  draw() {
    if (!this.active) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      this.render.render(this.stage);
      requestAnimationFrame(() => this.draw());
    });
  }


}
