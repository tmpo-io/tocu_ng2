import {
  Component, OnInit, Input, state,
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
      transition('opened => closed', animate('300ms ease-out')),
      transition('closed => opened', animate('300ms ease-out'))
    ]),
    trigger('backState', [
      state(CardState.Opened, style({
        transform: 'rotateY(180deg)'
      })),
      state(CardState.Closed,   style({
        transform: 'rotateY(0deg)'
      })),
      transition('opened => closed', animate('300ms ease-out')),
      transition('closed => opened', animate('300ms ease-out'))
    ])
  ]
})

export class MemoryCardComponent implements OnInit {

  @Input()
  public card: Card;

  public status: CardState = CardState.Closed;

  constructor() {}

  ngOnInit() {
    console.log(this.card);
  }

  toggle() {
    if(this.status === CardState.Closed) {
      this.status = CardState.Opened;
    } else {
      this.status = CardState.Closed;
    }
  }


}
