import {
  Component, OnInit, Input, state,
  style, transition, animate, trigger
} from '@angular/core';
import { CardState } from './card';
import { Word } from '../../../models/word';


@Component({
  selector: 'memory-card',
  templateUrl: './memorycard.component.html',
  styleUrls: ['./memorycard.component.scss'],
  animations: [
    trigger('frontState', [
      state('opened', style({
        transform: 'rotateY(0deg)'
      })),
      state('closed', style({
        transform: 'rotateY(180deg)'
      })),
      state('played', style({
        transform: 'rotateY(0deg) scale(0.9,0.9)',
        filter: 'grayscale(100%)'
      })),
      transition('opened => closed', animate('300ms ease-in')),
      transition('closed => opened', animate('300ms ease-in')),
      transition('opened => played', animate('100ms ease-in'))
    ]),
    trigger('backState', [
      state('opened', style({
        transform: 'rotateY(180deg)'
      })),
      state('closed', style({
        transform: 'rotateY(0deg)'
      })),
      state('played', style({
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

  constructor() { }

  ngOnInit() {
    // console.log(this.card);
  }


  toggle() {
    if (this.status === CardState.Closed) {
      this.status = CardState.Opened;
    } else {
      this.status = CardState.Closed;
    }
  }

  get image(): boolean {
    if (this.card.level && this.card.level !== 'principiant') {
      if (this.card.parella) {
        return false;
      }
    }
    return true;
  }

  get label(): boolean {
    if (this.card.level && this.card.level !== 'principiant') {
      if (!this.card.parella && this.card.level === 'pro') {
        return false;
      }
    }
    return true;
  }

}
