import {
  Component, OnInit, Input, EventEmitter, Output,
} from '@angular/core';

import { Word } from '../../../models/word';
import { WordsService, SoundFXService } from '../../services';
import { Shuffle } from '../../helpers';
import { LetterState } from '../letter/letter';
import { SequencingAnimation } from './board.animations';

@Component({
  selector: 'app-sequencing-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: SequencingAnimation
})
export class SequencingBoardComponent implements OnInit {
  @Input() words;
  @Output() onWin = new EventEmitter<number>();
  @Output() onFail = new EventEmitter<number>();
  @Output() onFinish = new EventEmitter<number>();

  public wordVisible: string = 'out';
  public lettersVisible: string = 'out';
  public goingNext: boolean = false;

  public currentWord: number = 0;
  public word: Word;
  public splittedWord: string[];
  public mixedWord: string[];
  public statusWord: Array<string>;

  public currentLetter: number = 0;

  public wins: number = 0;
  public fails: number = 0;

  constructor(
    private srv: WordsService,
    private fx: SoundFXService
  ) { }

  public ngOnInit() {
    this.words = Shuffle(this.words);
    this.buildWord();
  }

  private buildWord() {
    // this.words = Shuffle(this.words);
    this.word = this.words[this.currentWord];
    this.splittedWord = this.word.label.toUpperCase().split('');
    this.mixedWord = Shuffle(Array.from(this.splittedWord));
    this.statusWord = [];
    this.mixedWord.forEach(letter => this.statusWord.push(LetterState.Active));
    setTimeout(() => {
      this.wordVisible = 'in';
    }, 600);
    setTimeout(() => {
      this.lettersVisible = 'in';
      this.clickSound();
    }, 300);
  }

  clickLetter(indx: number): void {
    if (this.statusWord[indx] !== LetterState.Active) {
      return;
    }
    if (this.splittedWord[this.currentLetter] === this.mixedWord[indx]) {
      this.processGood(indx);
    } else {
      this.processBad(indx);
    }
  }

  private processGood(indx: number) {
    this.statusWord[indx] = LetterState.Played;
    this.nextLetter();
  }

  private processBad(indx: number) {
    this.fails++;
    this.onFail.emit(this.fails);
    this.statusWord[indx] = LetterState.Error;
    setTimeout(() => {
      this.statusWord[indx] = LetterState.Active;
    }, 500);
  }

  private nextLetter() {
    this.currentLetter++;
    if (this.currentLetter === this.splittedWord.length) {
      this.wins++;
      this.onWin.emit(this.wins);
      this.resultWord();
    }
  }

  private resultWord() {
    this.goingNext = true;
    this.lettersVisible = 'out';
    let audio: string = this.word.audio;
    setTimeout(() => {
      this.fx.play(audio);
    }, 300);
  }

  clickNextWord() {
    if (this.currentWord < this.words.length - 1) {
      this.wordVisible = 'out';
      setTimeout(() => {
        this.goingNext = false;
        this.currentWord++;
        this.currentLetter = 0;
        this.buildWord();
      }, 300);
    } else {
      this.onFinish.emit();
    }
  }

  public clickSound() {
    let audio: string = this.word.audio;
    setTimeout(() => {
      this.fx.play(audio);
    }, 300);
  }
}
