import { Observable } from 'rxjs/Rx';
import {
  Component, OnInit, Input, EventEmitter, Output,
} from '@angular/core';

import {state,
  style, transition, animate, trigger,
  AnimationEntryMetadata
 } from '@angular/core';

import { Word, WordsService, SoundFXService } from '../services';
import { Shuffle } from '../helpers';
import { WordState } from "./word/word";
import { MixedAnimation } from "./mixed.animations";


@Component({
  selector: "mixed-game",
  templateUrl:"./mixed.component.html",
  styleUrls: ["./mixed.component.scss"],
  animations: MixedAnimation
})
export class MixedComponent implements OnInit {

  @Input() words;
  @Output() onWin = new EventEmitter<number>();
  @Output() onFail = new EventEmitter<number>();
  @Output() onFinish = new EventEmitter<number>();

  private wins:number = 0;
  private fails:number = 0;
  private total:number = 0;
  private current:number = 0;
  private word:Word;
  private goingNext:boolean = false;

  private options:Array<string> = [];
  private optionsState:Array<string> = [];

  private wordVisible:string = "out";
  private lettersVisible:string = "out";

  constructor(
    private srv:WordsService,
    private fx:SoundFXService
  ) {}

  private playSound(ind:number):void {
    let audio:string;
    this.words.forEach((el, i) => {
      if(el.id==ind) {
        audio = el.audio
      }
    });
    setTimeout(()=> this.fx.play(audio), 300);
  }

  private buildWord():void {
    this.word = this.words[this.current];
    this.options = this.mixWord(this.word.label);
    this.options.forEach((el, i) => {
      this.optionsState[i] = WordState.Normal;
    });
    setTimeout(()=> this.wordVisible = "in", 100);
    setTimeout(()=> this.lettersVisible = "in", 300);
  }

  private mixWord(word:string):Array<string> {
    let opt:Array<string> = [word];
    for(let i=0; i < 3; i++) {
      opt.push(this.shuffleWord(word));
    }
    return Shuffle(opt);
  }

  private shuffleWord(word:string) {
    let splitted:Array<string> = word.split("");
    let w:string = Shuffle(Array.from(splitted)).join("");
    if(w!=word) {
      return w;
    } else {
      return this.shuffleWord(word);
    }
  }

  private clickItem(indx:number):void {
    if(this.goingNext == true) {
      return;
    }
    let word:string = this.options[indx];
    if(this.words[this.current].label==word) {
      this.processGood(indx);
    } else {
      this.processBad(indx);
    }
  }

  private processBad(indx:number):void {
    this.fails++;
    this.onFail.emit(this.fails);
    this.optionsState[indx] = WordState.Error;
  }

  private processGood(indx:number):void {
    this.optionsState[indx] = WordState.Success;
    this.wins++;
    this.onWin.emit(this.wins);
    if(this.wins==this.total) {
      this.onFinish.emit();
    } else {
      this.goingNext = true;
    }
  }

  private clickNextWord():void {
    this.wordVisible = "out";
    this.lettersVisible = "out";
    setTimeout(()=> {
      this.current++;
      this.buildWord();
      this.goingNext = false;
    }, 300);
  }

  public ngOnInit() {
    this.total = this.words.length;
    this.buildWord();
  }
}
