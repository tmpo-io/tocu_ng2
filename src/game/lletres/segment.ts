

import * as Pixi from 'pixi.js';
import { getColorNum } from '../../shared/colors';


export class Segment extends Pixi.Graphics {


  constructor(public from: Pixi.Point, public to: Pixi.Point) {
    super();
    this.lineStyle(10, getColorNum('gris'));
    this.moveTo(from.x, from.y);
    this.lineTo(to.x, to.y);
  }



}
