import {
  Component, OnInit, OnChanges, Input, state,
  style, transition, animate, trigger
 } from '@angular/core';
import { Card, CardState } from './card';



@Component({
  selector: 'memory-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('frontState', [
      state(CardState.Opened, style({
        transform: 'rotateY(0deg)'
      })),
      state(CardState.Closed,   style({
        transform: 'rotateY(180deg)'
      })),
      state(CardState.Played,   style({
        transform: 'rotateY(0deg)',
        opacity: 0.4
      })),
      transition('opened => closed', animate('300ms ease-in')),
      transition('closed => opened', animate('300ms ease-in'))
    ]),
    trigger('backState', [
      state(CardState.Opened, style({
        transform: 'rotateY(180deg)'
      })),
      state(CardState.Closed,   style({
        transform: 'rotateY(0deg)'
      })),
      state(CardState.Played,   style({
        transform: 'rotateY(180deg)'
      })),
      transition('opened => closed', animate('300ms ease-in')),
      transition('closed => opened', animate('300ms ease-in'))
    ])
  ]
})

export class MemoryCardComponent implements OnInit {

  @Input()
  public card: Card;

  @Input()
  public status: CardState = CardState.Closed;

  constructor() {}

  ngOnInit() {
    //console.log(this.card);
  }


  toggle() {
    if(this.status === CardState.Closed) {
      this.status = CardState.Opened;
    } else {
      this.status = CardState.Closed;
    }
  }


}
