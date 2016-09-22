import {
  Component, OnInit, Input
} from '@angular/core';

import {state,
  style, transition, animate, trigger } from '@angular/core';

import { MemoryService } from '../../services';
import { Card, CardState } from '../card/card';
import { Shuffle } from '../../helpers';


// animations: [
//     trigger('inboard', [
//       state('in', style({transform: 'scale(1,1)'})),
//       transition('void => *', [
//         style({transform: 'scale(0,0)'}),
//         animate('500ms ease-in')
//       ]),
//       transition('* => void', [
//         style({transform: 'scale(1,1)'}),
//         animate('500ms ease-in')
//       ])
//     ])
//   ]

@Component({
  selector: "memory-board",
  templateUrl:"./board.component.html",
  styleUrls: ["./board.component.scss"]
})

// IsActive


export class MemoryBoardComponent implements OnInit {

  public cards:Card[];
  public cardStatus:string[] = [];
  private isActive:number;
  private isOpened:boolean;
  // between state check
  private inTransition:boolean = false;
  public wins:number = 0;
  public total:number = 0;

  constructor(private srv:MemoryService) {}

  ngOnInit() {
    this.srv.getWords()
      .subscribe((card) => {
        this.buildBoard(card);
      });
  }

  onClick(ind:number):void {
    console.log("click on ", ind);
    if(this.inTransition) {
      return;
    }
    // test if index is already opened
    if(this.isOpened && ind === this.isActive) {
      return;
    }
    // test if ind can be opened
    let estat:string = this.cardStatus[ind];
    if(estat===CardState.Played) {
      // @TODO emit sound, wrong click?
      return;
    }

    if(!this.isOpened) {
      this.isActive = ind;
      this.isOpened = true;
      this.cardStatus[ind] = CardState.Opened;
      return;
    }

    if(this.cards[this.isActive].id === this.cards[ind].id) {
      // Goood
      this.inTransition = true;
      setTimeout(()=>this.processGood(ind), 1000);
    } else {
      // error
      this.inTransition = true;
      setTimeout(()=>this.processBad(ind), 1000)
    }

    // is already opened...
    this.cardStatus[ind] = CardState.Opened;
  }

  processBad(ind:number) {
    console.log("BADDD")
    this.cardStatus[ind] = CardState.Closed;
    this.cardStatus[this.isActive] = CardState.Closed;
    this.isActive = undefined;
    this.isOpened = false;
    this.inTransition = false;
}

  processGood(ind:number) {
    // @TODO show animation
    console.log("GOOD!", this.cards[ind].label);
    this.cardStatus[ind] = CardState.Played;
    this.cardStatus[this.isActive] = CardState.Played;
    this.isActive = undefined;
    this.isOpened = false;
    this.inTransition = false;
    this.wins++;
  }


  buildBoard(cards:Card[]) {
    let a:Card[] = [];
    cards.forEach((el, ind) => {
      a.push(el);
      a.push(Object.assign({}, el));
    });
    for(let i=0; i<a.length; i++) {
      this.cardStatus[i] = CardState.Closed;
    }
    this.cards = Shuffle(a);
    this.total = this.cards.length/2;

  }


}

