import {
  Component, OnInit, Input, state, EventEmitter, Output,
  style, transition, animate, trigger
 } from '@angular/core';

import { Word, WordsService, SoundFXService } from '../../services';
import { Shuffle } from '../../helpers';
import { LetterState } from '../letter/letter';


@Component({
  selector: "sequencing-board",
  templateUrl:"./board.component.html",
  styleUrls: ["./board.component.scss"],
  animations: [
    trigger('WordState', [
      state("out", style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      state("in",   style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('out <=> in', animate('300ms ease-in')),
    ]),
    trigger('letterState', [
      state("out", style({
        transform: 'translateY(300%)',
        opacity: 0
      })),
      state("in",   style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('out <=> in', animate('300ms ease-in')),
    ])
  ]
})
export class SequencingBoardComponent implements OnInit {
  @Input() private words;
  @Output() private onWin = new EventEmitter<number>();
  @Output() private onFail = new EventEmitter<number>();

  private wordVisible:string = "out";
  private lettersVisible:string = "out";
  private goingNext:boolean = false;

  private currentWord:number = 0;
  private word:Word;
  private splittedWord:string[];
  private mixedWord:string[];
  private statusWord:Array<string>;

  private currentLetter:number = 0;

  private wins:number = 0;
  private fails:number = 0;

  constructor(
    private srv:WordsService,
    private fx:SoundFXService
  ) {}

  ngOnInit() {
    this.buildWord();
  }

  private buildWord() {
    this.word = this.words[this.currentWord];
    this.splittedWord = this.word.label.toUpperCase().split("");
    this.mixedWord = Shuffle(Array.from(this.splittedWord));
    this.statusWord = [];
    this.mixedWord.forEach(letter => this.statusWord.push(LetterState.Active));
    setTimeout(()=> {
      this.wordVisible = "in";
    }, 100);
    setTimeout(()=> {
      this.lettersVisible = "in";
    }, 300);
  }

  private clickLetter(indx:number):void {
    if(this.statusWord[indx]!=LetterState.Active) {
      return;
    }
    if(this.splittedWord[this.currentLetter]==this.mixedWord[indx]) {
      this.processGood(indx);
    } else {
      this.processBad(indx);
    }
  }

  private processGood(indx:number) {
    this.statusWord[indx] = LetterState.Played;
    this.nextLetter();
  }

  private processBad(indx:number) {
    this.fails++;
    this.onFail.emit(this.fails);
    this.statusWord[indx] = LetterState.Error;
    setTimeout(()=> {
      this.statusWord[indx] = LetterState.Active;
    }, 500)
  }

  private nextLetter() {
    if(this.currentLetter < this.splittedWord.length-1) {
      this.currentLetter++;
    } else if(this.currentWord < this.words.length) {
      this.currentLetter++;
      this.resultWord();
    }
  }

  private resultWord() {
    this.goingNext = true;
    this.lettersVisible = "out";
    let audio:string = this.word.audio;
    setTimeout(()=>{
      this.fx.play(audio);
    }, 300);
  }

  private clickNextWord() {
    this.wins++;
    this.onWin.emit(this.wins);
    if(this.currentWord < this.words.length-1) {
      this.wordVisible = "out";
      setTimeout(()=> {
        this.goingNext = false;
        this.currentWord++;
        this.currentLetter=0;
        this.buildWord();
      }, 300);
    }
  }
}
