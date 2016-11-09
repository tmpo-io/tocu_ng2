
import {
  Component, Input, OnInit, AfterViewInit,
  ViewChildren, Renderer,
  QueryList
} from '@angular/core';

import { getRandomColor } from '../../colors';

@Component({
  selector: 'balloons',
  templateUrl: './balloons.component.html',
  styleUrls: ['./balloons.component.scss']
})
export class BallonsComponent implements OnInit, AfterViewInit {

  @Input() public amount: number = 10;
  @Input() public delay: number = 2000;
  @Input() public duration: number = 7000;

  public props: number[] = [];
  public colors: Array<string> = [];
  public enabled: boolean = true;
  public explode: Array<boolean> = [];

  @ViewChildren('balloons') childs: QueryList<any>;

  constructor(private render: Renderer) { }

  public clickBalloon(indx: number) {
    this.explode[indx] = true;
  }

  public ngAfterViewInit() {
    let i = 0;
    this.childs.forEach((item) => {
      this.render.setElementStyle(
          item.nativeElement,
          'transition', this.transition
        );
      setTimeout(() => {
        let pLeft: number = -((1000 - ((i / (this.amount - 1)) * 1000)) - 500);
        this.render.setElementStyle(
          item.nativeElement,
          'transform',
          `translate3d(${pLeft}px,-1200px, 0)`
        );
        this.render.setElementStyle(
          item.nativeElement,
          'opacity', '1'
        );
        this.render.setElementStyle(
          item.nativeElement,
          'transition-delay', Math.random() * this.delay + 'ms'
        );
        i++;
      });
    });
    setTimeout(() => {
      this.enabled = false;
    }, this.duration + this.delay);
  }

  public get transition(): string {
    return `transform ${this.duration}ms linear`;
  }

  public ngOnInit() {
    for (let i = 0; i < this.amount; i++) {
      this.props.push(i);
      this.colors.push(getRandomColor());
      this.explode.push(false);
    }
  }
}
