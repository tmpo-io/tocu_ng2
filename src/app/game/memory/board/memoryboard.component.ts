import {
  Component, OnInit, Input, EventEmitter, Output,
} from '@angular/core';


import { Word } from '../../../models/word';
import { WordsService, SoundFXService } from '../../services';
import { CardState } from '../card/card';
import { Shuffle } from '../../helpers';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-memory-board',
  templateUrl: './memoryboard.component.html',
  styleUrls: ['./memoryboard.component.scss'],
  // animations: stagger('inboard', 0, 16, 50)
})

// IsActive


export class MemoryBoardComponent implements OnInit {

  @Input() cards: Word[];
  @Input() level: string = 'principiant';

  public cardStatus: string[] = [];
  private isActive: number;
  private isOpened: boolean;
  // between state check
  private inTransition: boolean = false;
  public wins: number = 0;
  public fails: number = 0;
  public total: number = 0;
  public index: number;

  // Emitters
  @Output() public onWin = new EventEmitter<number>();
  @Output() public onFail = new EventEmitter<number>();
  @Output() public onFinish = new EventEmitter<number>();

  constructor(
    private srv: WordsService,
    private fx: SoundFXService
  ) { }

  ngOnInit() {
    this.buildBoard(this.cards);
    // stagger('asdf', 0, 15, '100ms')
  }

  onClick(ind: number): void {
    // console.log("click on ", ind);
    if (this.inTransition) {
      return;
    }
    // test if index is already opened
    if (this.isOpened && ind === this.isActive) {
      return;
    }
    // test if ind can be opened
    let estat: string = this.cardStatus[ind];
    if (estat === CardState.Played) {
      // @TODO emit sound, wrong click?
      return;
    }

    if (!this.isOpened) {
      this.isActive = ind;
      this.isOpened = true;
      this.cardStatus[ind] = CardState.Opened;
      this.playSound(ind);
      return;
    }

    if (this.cards[this.isActive].id === this.cards[ind].id) {
      // Goood
      this.inTransition = true;
      setTimeout(() => this.processGood(ind), 1000);
    } else {
      // error
      this.inTransition = true;
      setTimeout(() => this.processBad(ind), 1000);
    }

    // is already opened...
    this.cardStatus[ind] = CardState.Opened;
    // get the sound
    this.playSound(ind);

  }

  get isPro(): boolean {
    if (this.level && this.level !== 'principiant') {
      return true;
    }
    return false;
  }

  playSound(ind: number) {
    let audio: string = this.cards[ind].audio;
    if (this.cards[ind].parella === true && this.isPro) {
      return;
    }
      setTimeout(() => {
        this.fx.play(audio);
      }, 300);
  }

  processBad(ind: number) {
    // console.log("BADDD")
    this.cardStatus[ind] = CardState.Closed;
    this.cardStatus[this.isActive] = CardState.Closed;
    this.isActive = undefined;
    this.isOpened = false;
    this.inTransition = false;
    this.fails++;
    this.onFail.emit(this.fails);

  }

  processGood(ind: number) {
    // @TODO show animation
    //console.log("GOOD!", this.cards[ind].label);
    this.cardStatus[ind] = CardState.Played;
    this.cardStatus[this.isActive] = CardState.Played;
    this.isActive = undefined;
    this.isOpened = false;
    this.inTransition = false;
    this.wins++;
    this.onWin.emit(this.wins);
    if (this.wins === this.total) {
      this.onFinish.emit();
    }
  }


  buildBoard(words: Word[]) {
    let cards = Shuffle(words);
    // Ensure that a maximum of 8 cards are
    // showed to user.
    if (cards.length > 8) {
      cards = cards.slice(0, 8);
    }

    cards.forEach(c => c.level = this.level);
    console.log('Board', cards, this.level);

    let a: Word[] = [];
    cards.forEach((el, ind) => {
      // snd.push(el.audio);
      a.push(el);
      a.push(Object.assign({}, el, {
        parella: true
      }));
    });
    for (let i = 0; i < a.length; i++) {
      this.cardStatus[i] = CardState.Closed;
    }
    this.cards = Shuffle(a);
    this.total = this.cards.length / 2;
    // this.fx.add(snd);
    // this.fx.preload();
  }
}
