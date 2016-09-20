import { Component, OnInit, Input } from '@angular/core';
import { Card, CardState } from './card';



@Component({
  selector: 'memory-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class MemoryCardComponent implements OnInit {

  @Input()
  public card: Card;

  public status: CardState = CardState.Closed;

  constructor() {}

  ngOnInit() {
    console.log(this.card);
  }


}
