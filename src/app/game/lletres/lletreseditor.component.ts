

import {
  Component, EventEmitter, OnInit,
  OnDestroy, ElementRef, NgZone,
  Output
} from '@angular/core';

import { PixiBase } from '../../shared/pixi/base';

import { Ball } from '../../shared/pixi/ball';
import { Punt } from './punt';

import { LLetraSerial } from './lletres.state';

@Component({
  selector: 'app-lletres-editor',
  template: `
    <button (click)="output()">Output</button>
    `,
  styles: [
    `button, div { position: absolute; bottom: 5px; }
    button { right: 10px; } `
  ]
})
export class LletresEditorComponent extends PixiBase implements OnInit, OnDestroy {
  constructor(ngZone: NgZone, el: ElementRef) {
    super(ngZone, el);
  }

  nodes: Ball[] = [];

  current = 0;
  part: Punt[] = [];

  @Output()
  onLletres: EventEmitter<LLetraSerial> = new EventEmitter<LLetraSerial>();

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  pixiReady() {
    this.drawGrid();
  }

  addBall(index, x, y) {
    // console.log("ADD BALL", index, x, y);
    this.part[this.current] = new Punt({ x, y }, index);
    this.part[this.current].radius = this.width / 30;
    this.part[this.current].draw();
    this.stage.addChild(this.part[this.current]);
    this.current++;
    // this.stage.addChild()
    let list = [this.part.map((a) => a.index)];
    this.onLletres.next(list);
  }

  output() {
    let d = '[';
    this.part.forEach((a) => {
      d += a.index + ',';
    });
    d += ']';
    console.log('Lletra :', d);
  }

  drawGrid() {

    // console.log(this.width, this.height);

    let width = (this.width / 12);
    let height = (this.height / 12);
    let inix = this.width / 10;
    let iniy = this.height / 10;
    let pos = 0;
    for (let i = 0; i < 9; i++) {
      for (let k = 0; k < 9; k++) {
        const b = new Ball(10, 0xCCCCCC);
        b.x = inix + (width * k);
        b.y = iniy + (height * i);
        b.interactive = true;
        b.index = pos;
        let f = this;
        b.on('click', function () {
          console.log('click at', this.index, this.x, this.y);
          f.addBall(this.index, this.x, this.y);
        });
        this.nodes[pos] = b;
        this.stage.addChild(this.nodes[pos]);
        pos++;
      }
    }

    // console.log(this.nodes);

  }

}


