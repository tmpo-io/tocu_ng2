import {
  Component, OnInit, Input
} from '@angular/core';

import { MemoryService } from '../../services';
import { Card, CardState } from '../card/card';


@Component({
  selector: "memory-board",
  templateUrl:"./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class MemoryBoardComponent implements OnInit {

  private cards:Card[]

  constructor(private srv:MemoryService) {}

  ngOnInit() {
    this.srv.getWords()
      .subscribe(card => this.cards = card);
  }

}

