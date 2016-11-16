import {
  Component, ElementRef, NgZone,
  OnInit, OnDestroy, Input
} from '@angular/core';

import * as Pixi from 'pixi.js';

import { PixiBase } from '../../shared/pixi/base';

// Pixi objects
import { Punt } from './punt';
import { Segment } from './segment';

import { Lletra, Part, Point } from './lletres.state';

@Component({
  selector: 'app-lletres',
  template: ''
})
export class LletresComponent extends PixiBase implements OnInit, OnDestroy {

  @Input() lletra: Lletra = [
    [{ x: 100, y: 200 },
    { x: 300, y: 300 },
    { x: 400, y: 500 }],
    [{ x: 200, y: 450 },
    { x: 400, y: 350 }]
  ];

  private puntsClip = <Punt[]>[];
  private segments = <Segment[]>[];
  private line: Pixi.Graphics = new Pixi.Graphics();

  current = 0;
  dragging = false;
  currentPart = 0;

  constructor(ngZone: NgZone, el: ElementRef) {
    super(ngZone, el);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  addPoints(part: number) {
    for (let i = 0; i < this.lletra[part].length; i++) {
      let p = new Punt(this.lletra[part][i], i);
      this.puntsClip.push(p);
      this.stage.addChild(p);
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
      console.log('You win');
      return;
    }
    this.setActive();
    this.curr.emit('mousedown');
  }

  mouseMove(ev) {
    if (this.dragging) {
      // console.log('dragging');
      this.line.clear();
      this.line.lineStyle(10);
      this.line.moveTo(this.curr.x, this.curr.y);
      this.line.lineTo(ev.data.global.x, ev.data.global.y);
      let p = new Pixi.Point(ev.data.global.x, ev.data.global.y);
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

  pixiReady() {

    this.stage.interactive = true;
    this.addPoints(this.currentPart);
    this.setActive();

    this.stage.on('mouseup', this.mouseUp.bind(this));
    this.stage.on('mouseupoutside', this.mouseUp.bind(this));
    this.stage.on('mousemove', this.mouseMove.bind(this));
    this.stage.on('touchmove', this.mouseMove.bind(this));
    this.stage.addChildAt(this.line, 0);
  }

  getRenderOptions(): Pixi.IRendererOptions {
    return {
      transparent: true,
      autoResize: true,
      antialias: true
    };
  }

}
