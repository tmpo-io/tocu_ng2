import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Output, Input, EventEmitter,
  ApplicationRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  WordsService,
  Word,
  SoundFXService,
  ImageLoader
} from '../../services';

import { TimerComponent } from '../timer/timer.component';

export type GameStatus = 'preload' | 'playing' | 'end'


@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})

export class GameComponent implements OnInit {

  // States
  public gameType:string;
  public title:string;
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

  private gameID:string

  constructor(
    private srv:WordsService,
    private fx:SoundFXService,
    private iloader:ImageLoader,
    private route: ActivatedRoute,
    private cd: ApplicationRef
  ) {}


  ngOnInit() {
    this.route.params
      .switchMap((p, i)=>{
        if("game" in p) {
          // debug
          this.gameType = p["game"];
          this.title = this.gameType;
          return this.srv.getWords()
        } else {
          // if we need to store game params...
          this.gameID = p["id"];
          // need to fetch game type... and game properties...
          return this.srv.getGame(p["uid"], p["id"]).switchMap(
            (snapshot, ind)=>{
              let game = snapshot.val()
              this.gameType = game.tipus;
              this.title = game.label.toUpperCase();
              return Observable.from(game.words)
                .toArray();
            }
          )
        }
      }).subscribe((card)=>{
        // console.log(card)
        this.cards = card;
        this.preloadFx();
      })
  }

  startGame(event) {
    this.points = 0;
    this.fails = 0;
    this.status = 'playing';
  }

  onWin(event:number) {
    console.log("Wins", event);
    this.points = event;
  }

  onFinish() {
    this.status = 'end';
  }

  onFail(event:number) {
    this.fails = event;
  }

  preloadFx() {
    let snd:string[] = [];
    let img:string[] = [];
    // console.log("[GL]: preloadFx", this.cards)
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
        // console.log("Loaded")
        this.lstep = data;
        this.cd.tick();
      },
      (err)=>{
        console.log('error loading audios', err);
      },
      () => {
        this.EndPreload()
        // console.log("items loaded", this);
      }
    );
  }

  EndPreload() {
    this.preloadReady = true;
    // console.log("End preload", this.preloadReady);
    this.cd.tick();
  }

}
