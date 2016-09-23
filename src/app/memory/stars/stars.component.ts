
import {
  Component, Input, OnInit,
  AfterViewInit, ViewChildren, Renderer,
  style, animate, trigger, state, transition,
  QueryList
} from '@angular/core'

import { getRandomColor } from '../../helpers';

@Component({
  selector: 'star-explosion',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarComponent implements OnInit {

  @Input() public amount:number = 10;
  @Input() public delay:number = 10;

  public enabled:boolean = true;

  @ViewChildren("svgs") childs: QueryList<any>;

  constructor(private _render: Renderer) {}

  public props:number[] = [];

  ngAfterViewInit() {
    //console.log(this.childs.toArray());
    let i = 1;
    this.childs.forEach((item)=>{
      i++;
      setTimeout(()=>{
        this._render.setElementStyle(
           item.nativeElement,
           'transform',
           `translate3d(${random()}%, ${random()}%, 0) rotate(360deg)
              scale(${Math.random()}, ${Math.random()})`
        );
        this._render.setElementStyle(
           item.nativeElement,
           'opacity',
           '0'
        );
        this._render.setElementStyle(
           item.nativeElement,
           'transition-duration',
           '${0.3 + Math.random()}s'
        );
      }, this.delay*i)
    });

    // Cleanup DOM after the effect
    setTimeout(()=>{
      this.enabled = false;
    }, (this.delay*this.amount) + 1000);

  }



  ngOnInit() {
    for(let i=0; i<this.amount; i++) {
      this.props.push(i);
    }
  }

  setStyles() {
    return {
      fill: getRandomColor(),
      display: 'inline'
    }
  }

}

function random():number {
    return -500 + Math.round(Math.random()*1000);
}


// this._render.setElementStyle(
      //   item.nativeElement, 'transform', 'translate3d(-300px, -300px, 0)'
      // );
      // this._render.setElementStyle(
      //   item.nativeElement, 'transform', 'translate3d(-300%, -300%, 0)'
      // );

      //this._render.setElementClass(item.)
      // this._render.setElementStyle(item.nativeElement,
      //   'top', random() + "px")
      // item.nativeElement.animate([
      //   {
      //     transform: 'translate3d(0,0,0)'
      //   },
      //   {
      //     transform: `translate3d(300px, 300px, 0)`
      //   }
      // ], {duration: 1000, 'fill-mode': 'forwards'})

      // this._render.animate(item,
      //   {styles: [{transform: `translate3d(300px, 300px, 0)`}]},
      //   [
      //     {
      //       offset: 0,
      //       styles: {styles:[
      //         {transform: `translate3d(0px, 0px, 0)`}
      //       ]}
      //     },
      //     {
      //       offset: 1,
      //       styles: {styles:[
      //         {transform: `translate3d(300px, 300px, 0)`}
      //       ]}
      //     }
      //   ], 1000, 0, 'ease-in');
