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
import { RelacionaAnimation } from "./relaciona.animations";

@Component({
  selector: "relaciona-game",
  templateUrl:"./relaciona.component.html",
  styleUrls: ["./relaciona.component.scss"]
  // animations: RelacionaAnimation
})
export class RelacionaComponent implements OnInit {

  @Input() private words;
  @Output() private onWin = new EventEmitter<number>();
  @Output() private onFail = new EventEmitter<number>();
  @Output() private onFinish = new EventEmitter<number>();

  private wins:number = 0;
  private fails:number = 0;
  private total:number = 0;

  private selected:number;
  private selectedType:string;

  private mixedImages:Array<any> = [];
  private mixedTexts:Array<any> = [];

  private statusImages:Array<string> = [];
  private statusTexts:Array<string> = [];

  constructor(
    private srv:WordsService,
    private fx:SoundFXService
  ) {}

  private playSound(ind:number) {
    let audio:string;
    this.words.forEach((el, i) => {
      if(el.id==ind) {
        audio = el.audio
      }
    });
    setTimeout(()=> this.fx.play(audio), 300);
  }

  private clickItem(indx:number, type:string):void {
    if(this.selectedType==type) {
      return;
    }
    if(this.getWordStatus(indx, type)!=WordState.Normal) {
      return;
    }

    this.playSound(indx);

    if(this.selected) {
      if(indx==this.selected) {
        this.processGood(indx);
      } else {
        this.changeWordStatus(this.selected, this.selectedType,
                              WordState.Error);
        this.changeWordStatus(indx, type, WordState.Error);
        setTimeout(()=>{
          this.changeWordStatus(this.selected, this.selectedType,
                                WordState.Normal);
          this.changeWordStatus(indx, type, WordState.Normal);
          this.processBad(indx);
        }, 1000);
      }
    } else {
      this.selectedType = type;
      this.selected = indx;
      this.changeWordStatus(indx, type, WordState.Selected);
    }
  }

  private changeWordStatus(indx:number, type:string, state:string):void {
    if(type=="image") {
      this.statusImages[indx] = state;
    } else {
      this.statusTexts[indx] = state;
    }
  }

  private getWordStatus(indx:number, type:string):string {
    if(type=="image") {
      return this.statusImages[indx];
    } else {
      return this.statusTexts[indx];
    }
  }

  private processBad(indx:number) {
    this.fails++;
    this.onFail.emit(this.fails);
    this.selected = null;
    this.selectedType = null;
  }

  private processGood(indx:number) {
    this.wins++;
    this.onWin.emit(this.wins);
    this.selected = null;
    this.selectedType = null;
    this.changeWordStatus(indx, "text", WordState.Played);
    this.changeWordStatus(indx, "image", WordState.Played);

    if(this.wins==this.total) {
      this.onFinish.emit();
    }
  }

  public ngOnInit() {
    this.total = this.words.length;
    this.words.forEach((el, ind) => {
      this.statusImages[el.id] = WordState.Normal;
      this.statusTexts[el.id] = WordState.Normal;
    });
    this.mixedImages = Shuffle(Array.from(this.words));
    this.mixedTexts = Shuffle(Array.from(this.words));
  }
}
