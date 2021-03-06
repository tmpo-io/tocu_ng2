import {
  Component, ElementRef, EventEmitter, NgZone,
  OnInit, OnDestroy, Input, Output, OnChanges
} from '@angular/core';

import { Graphics, IRendererOptions, Point } from 'pixi.js';
import { PixiBase } from '../../shared/pixi/base';


// Pixi objects
import { Punt } from './punt';
import { Segment } from './segment';
import { Lletra, IPoint } from './lletres.state';
import { TmpoTweenService } from '../../shared/tween';
import { FxService } from '../../fx/fx.service';


@Component({
  selector: 'app-lletres',
  template: ''
})
export class LletresComponent extends PixiBase
  implements OnInit, OnDestroy, OnChanges {

  @Input() lletra: Lletra = [
    [{ x: 100, y: 200 },
    { x: 300, y: 300 },
    { x: 400, y: 500 }],
    [{ x: 200, y: 450 },
    { x: 400, y: 350 }]
  ];

  @Input()
  lletraA = [[73, 1, 22, 31, 37, 49, 58, 72]];

  @Input()
  character = '';

  @Output()
  win = new EventEmitter<boolean>();

  @Output()
  onPoint = new EventEmitter<boolean>();

  closePart = -1; // -1 No circular, 0 > circular
  current = 0;
  dragging = false;
  currentPart = 0;
  initialized = false;

  private puntsClip = <Punt[]>[];
  private segments = <Segment[]>[];
  private line: Graphics = new Graphics();

  constructor(
    ngZone: NgZone,
    el: ElementRef,
    private tween: TmpoTweenService,
    private fx: FxService) {
    super(ngZone, el);
  }

  ngOnInit() {
    super.ngOnInit();
    this.checkSelfClosing();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  addPoints(part: number) {
    let radius = this.width / 20;
    for (let i = 0; i < this.lletra[part].length; i++) {
      let p = new Punt(this.lletra[part][i], i);
      p.radius = radius;
      if (i === 0) {
        p.animateIntro = false;
      }
      p.init();
      this.puntsClip.push(p);
      this.stage.addChild(p);
    }

  }

  addClosePoint(part: number) {
    if (this.closePart === part) {
      let i = this.puntsClip.length;
      let p = new Punt(this.lletra[part][0], i);
      p.radius = this.width / 25;
      p.init();
      this.puntsClip.push(p);
      this.stage.addChild(p);
    }
  }
  // Patch to have autoclosing characters
  checkSelfClosing() {
    if (['O', 'Q', '8'].indexOf(this.character) !== -1) {
      this.closePart = 0;
    } else {
      this.closePart = -1;
    }
  }

  addSegment() {
    let s = new Segment(this.curr.point, this.next.point);
    this.segments.push(s);
    this.stage.addChildAt(s, 0);
  }

  setActive() {
    this.curr.setState('next');
    this.curr.on('mousedown', this.mouseDown.bind(this));
    this.curr.on('touchstart', this.mouseDown.bind(this));
  }

  mouseUp() {
    if (this.dragging) {
      this.dragging = false;
      this.line.clear();
      this.next.setState('waiting');
      this.curr.setState('next');
    }
  }

  mouseDown() {
    this.dragging = true;
    this.curr.setState('current');
    this.next.setState('next');
  }

  advance() {
    this.addSegment();
    this.curr.removeListener('mousedown', this.mouseDown.bind(this));
    this.curr.removeListener('touchstart', this.mouseDown.bind(this));
    this.curr.interactive = false;
    this.current++;
    // this.fx.play('/assets/fx/click.mp3');
    this.onPoint.next(true);
    if (this.current === 1) {
      this.addClosePoint(this.currentPart);
    }

    if (this.current === this.puntsClip.length - 1) {
      // console.log('wins');
      this.dragging = false;
      this.curr.setState('current');
      if (this.hasNextPart) {
        this.currentPart++;
        this.addPoints(this.currentPart);
        this.current++;
        this.setActive();
        return;
      }
      // console.log('You win');
      // this.win.next(true);
      this.onWin();
      return;
    }
    this.setActive();
    this.curr.emit('mousedown');
  }

  onWin() {
    let i = 1;
    this.puntsClip.forEach((el) => {
      this.tween
        .to(el, 400, { alpha: 0 })
        .delay(800 + (i * 50))
        .do(v => el.scale = new Point(v.alpha, v.alpha))
        .subscribe();
      i++;
    });
    i = 1;
    this.segments.forEach((el) => {
      this.tween
        .to(el, 200, { alpha: 0 })
        .delay(500 + (i * 50))
        .do(v => Object.assign(el, v))
        .subscribe();
      i++;
    });
    setTimeout(() => this.win.next(true));

  }

  mouseMove(ev) {
    if (this.dragging) {
      // console.log('dragging');
      this.line.clear();
      this.line.lineStyle(10);
      this.line.moveTo(this.curr.x, this.curr.y);
      this.line.lineTo(ev.data.global.x, ev.data.global.y);
      let p = new Point(ev.data.global.x, ev.data.global.y);
      if (this.next.containsPoint(p) === true) {
        this.dragging = false;
        this.line.clear();
        this.advance();
      }
    }
  }

  get hasNextPart(): boolean {
    return (this.currentPart + 1 < this.lletra.length);
  }

  get next(): Punt {
    return this.puntsClip[this.current + 1];
  }

  get curr(): Punt {
    return this.puntsClip[this.current];
  }

  ngOnChanges(v) {
    // console.log('changed', v);
    this.puntsClip = [];
    if (this.stage) {
      this.stage.removeChildren();
    }
    if (this.initialized) {
      this.checkSelfClosing();
      this.pixiReady();
    }
  }

  pixiReady() {
    if (this.lletraA) {
      this.lletra = this.toCoords(this.lletraA);
      this.stage.interactive = true;
      this.addPoints(this.currentPart);
      this.setActive();

      this.stage.on('mouseup', this.mouseUp.bind(this));
      this.stage.on('mouseupoutside', this.mouseUp.bind(this));
      this.stage.on('touchend', this.mouseUp.bind(this));
      this.stage.on('touchendoutside', this.mouseUp.bind(this));
      this.stage.on('mousemove', this.mouseMove.bind(this));
      this.stage.on('touchmove', this.mouseMove.bind(this));
      this.stage.addChildAt(this.line, 0);
    }
    this.initialized = true;
  }

  getRenderOptions(): IRendererOptions {
    return {
      transparent: true,
      autoResize: true,
      antialias: true
    };
  }

  // lletraA = [[73, 4, 79], [38, 42]];
  private toCoords(a: number[][]): Lletra {
    let w = (this.width - 120) / 8;
    let h = (this.height - 120) / 9;
    const ix = 60;
    const iy = 30;

    let l: Lletra = [];
    a.forEach((part) => {
      let p: IPoint[] = [];
      part.forEach((punt) => {
        let col = Math.ceil(punt / 9);
        let row = punt % 9;
        // console.log(row, col, w, h);
        p.push({
          x: ix + (w * row),
          y: iy + (h * col)
        });
      });
      l.push(p);
    });
    // console.log(l);
    return l;
  }


}
