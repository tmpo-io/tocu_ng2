
import {
  Component, Input, OnInit,
  AfterViewInit, ViewChildren, Renderer,
  style, animate, trigger, state, transition,
  QueryList
} from '@angular/core'

import { getRandomColor } from '../../helpers';

@Component({
  selector: 'balloons',
  templateUrl: './balloons.component.html',
  styleUrls: ['./balloons.component.scss']
})
export class BallonsComponent implements OnInit {

  @Input() public amount:number = 10;
  @Input() public delay:number = 1000;

  private props:number[] = [];
  private colors:Array<string> = [];
  private enabled:boolean = true;
  private explode:Array<boolean> = [];

  @ViewChildren("balloons") childs: QueryList<any>;

  constructor(private _render: Renderer) {}

  private clickBalloon(indx:number) {
    this.explode[indx] = true;
  }

  public ngAfterViewInit() {
    let i = 0;
    this.childs.forEach((item)=>{
      setTimeout(()=> {
        let pLeft:number = -((1000-((i/(this.amount-1))*1000))-500);
        this._render.setElementStyle(
          item.nativeElement,
          'transform',
          `translate3d(${pLeft}px,-1200px, 0)`
        );
        this._render.setElementStyle(
          item.nativeElement,
          'opacity', "1"
        );
        this._render.setElementStyle(
          item.nativeElement,
          'transition-delay', Math.random()*this.delay+"ms"
        );
        i++;
      });
    });
    setTimeout(()=>{
      this.enabled = false;
    }, 3000+this.delay);
  }

  public ngOnInit() {
    for(let i=0; i<this.amount; i++) {
      this.props.push(i);
      this.colors.push(getRandomColor());
      this.explode.push(false);
    }
  }
}
