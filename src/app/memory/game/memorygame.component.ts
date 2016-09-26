
import { Component, OnInit, Output, Input,
    EventEmitter, ApplicationRef } from '@angular/core';

import { Observable } from 'rxjs/Rx';

// @todo rename MemoryService to @WordService
import {
  WordsService,
  Word,
  SoundFXService,
  ImageLoader
} from '../../services';

type GameStatus = 'preload' | 'playing' | 'end'


@Component({
  selector: 'memory-game',
  templateUrl: './memorygame.component.html',
  styleUrls: ['./memorygame.component.scss'],
})

export class MemorygameComponent implements OnInit {

  // States
  public status:GameStatus = 'preload';
  public preloadReady:boolean = false;

  // @Input()
  preload:Observable<number>;
  public cards:Word[];

  // public loaded:number
  public lstep:number = 0;
  public ltotal:number;

  public total:number;
  public points:number = 0;
  public fails:number = 0;

  constructor(
    private srv:WordsService,
    private fx:SoundFXService,
    private iloader:ImageLoader,
    private cd: ApplicationRef
  ) {}


  ngOnInit() {
    this.srv.getWords()
      .subscribe((card)=>{
        this.cards = card;
        this.preloadFx();
      })
  }

  startGame(event) {
    this.status = 'playing';
  }

  onWin(event:number) {
    console.log("Wins", event);
    this.points = event;
    if(this.points == this.total) {
      this.status = 'end';
    }
  }

  newGame(ev) {
    this.points = 0;
    this.fails = 0;
    this.status = 'playing';
  }

  onFail(event:number) {
    this.fails = event;
  }

  preloadFx() {
    let snd:string[] = [];
    let img:string[] = [];
    this.cards.forEach((el, ind) => {
      snd.push(el.audio);
      img.push(el.image);
    });

    this.total = img.length;
    this.fx.add(snd);
    this.iloader.add(img);

    this.ltotal = snd.length + img.length;

    let sndpr:Observable<number> = this.fx.preload().asObservable();
    let imgpr:Observable<number> = this.iloader.preload().asObservable()

    this.preload = sndpr.combineLatest(
      imgpr,
      (a, b)=>{ return a+b }
    );

    this.preload.subscribe(
      (data:number) => {
       this.lstep = data;
       this.cd.tick();
     },
     (err)=>{
       console.log('error loading audios', err);
     },
     () => {
       this.EndPreload()
       console.log("items loaded", this);
     });
  }

  EndPreload() {
    this.preloadReady = true;
    this.cd.tick();
  }

}
