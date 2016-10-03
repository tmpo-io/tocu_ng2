import {
  Component, OnInit, OnChanges, Input, state,
  style, transition, animate, trigger
 } from '@angular/core';
import { CardState } from './card';
import { Word } from '../../services';


@Component({
  selector: 'memory-card',
  templateUrl: './memorycard.component.html',
  styleUrls: ['./memorycard.component.scss'],
  animations: [
    trigger('frontState', [
      state(CardState.Opened, style({
        transform: 'rotateY(0deg)'
      })),
      state(CardState.Closed,   style({
        transform: 'rotateY(180deg)'
      })),
      state(CardState.Played,   style({
        transform: 'rotateY(0deg) scale(0.9,0.9)',
        filter: 'grayscale(100%)'
      })),
      transition('opened => closed', animate('300ms ease-in')),
      transition('closed => opened', animate('300ms ease-in')),
      transition('opened => played', animate('100ms ease-in'))
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
  public card: Word;

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
