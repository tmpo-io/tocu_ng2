import {
  Component, OnInit, Input, EventEmitter, Output,
} from '@angular/core';

import {state,
  style, transition, animate, trigger,
  AnimationEntryMetadata
 } from '@angular/core';

import { Word, WordsService, SoundFXService } from '../../services';
import { CardState } from '../card/card';
import { Shuffle } from '../../helpers';

import { Observable } from 'rxjs/Rx';


function stagger(name:string, ini:number,
  end:number, delay:number):AnimationEntryMetadata[] {

  let nums:number[] = []
  for(let i=ini; i<end; i++) {
    nums.push(i);
  }
  //console.log(nums);
  //console.log(range);
  let out:any = [];
  nums.forEach((n) => {
    out.push(

          state(''+n, style({transform: 'scale(1,1)'})),
          transition('void => '+n, [
            style({transform: 'scale(0,0)'}),
            animate('500ms '+ delay*n +'ms ease-in')
          ]),
          transition(n + ' => void', [
            style({transform: 'scale(1,1)'}),
            animate('500ms '+ delay*n +'ms ease-in')
          ])

    );
  })
  //console.log(out);
  return [new AnimationEntryMetadata(name, out)];
}


@Component({
  selector: "memory-board",
  templateUrl:"./board.component.html",
  styleUrls: ["./board.component.scss"],
  animations: stagger('inboard', 0, 16, 50)
})

// IsActive


export class MemoryBoardComponent implements OnInit {

  @Input() cards:Word[];

  public cardStatus:string[] = [];
  private isActive:number;
  private isOpened:boolean;
  // between state check
  private inTransition:boolean = false;
  public wins:number = 0;
  public fails:number = 0;
  public total:number = 0;

  // Emitters
  @Output() public onWin = new EventEmitter<number>();
  @Output() public onFail = new EventEmitter<number>()
  @Output() public onFinish = new EventEmitter<number>();

  constructor(
    private srv:WordsService,
    private fx:SoundFXService
    ) {}

  ngOnInit() {
    this.buildBoard(this.cards);
    // stagger('asdf', 0, 15, '100ms')
  }

  onClick(ind:number):void {
    // console.log("click on ", ind);
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
      this.playSound(ind);
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
    // get the sound
    this.playSound(ind);

  }

  playSound(ind:number) {
    let audio:string = this.cards[ind].audio;
    setTimeout(()=>{
      this.fx.play(audio);
    }, 300);
  }

  processBad(ind:number) {
    // console.log("BADDD")
    this.cardStatus[ind] = CardState.Closed;
    this.cardStatus[this.isActive] = CardState.Closed;
    this.isActive = undefined;
    this.isOpened = false;
    this.inTransition = false;
    this.fails++;
    this.onFail.emit(this.fails);

}

  processGood(ind:number) {
    // @TODO show animation
    //console.log("GOOD!", this.cards[ind].label);
    this.cardStatus[ind] = CardState.Played;
    this.cardStatus[this.isActive] = CardState.Played;
    this.isActive = undefined;
    this.isOpened = false;
    this.inTransition = false;
    this.wins++;
    this.onWin.emit(this.wins);
    if(this.wins==this.total) {
      this.onFinish.emit();
    }
  }


  buildBoard(cards:Word[]) {
    let a:Word[] = [];
    let snd:string[] = [];
    cards.forEach((el, ind) => {
      // snd.push(el.audio);
      a.push(el);
      a.push(Object.assign({}, el));
    });
    for(let i=0; i<a.length; i++) {
      this.cardStatus[i] = CardState.Closed;
    }
    this.cards = Shuffle(a);
    this.total = this.cards.length/2;
    // this.fx.add(snd);
    // this.fx.preload();
  }
}
