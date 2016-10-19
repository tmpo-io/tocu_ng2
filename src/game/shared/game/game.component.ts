import { Component, OnInit, Output, Input, EventEmitter,
  ApplicationRef, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  WordsService,
  Word,
  SoundFXService,
  ImageLoader
} from '../../services';

import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { combineLatest} from 'rxjs/operator/combineLatest';

import 'rxjs/add/operator/withLatestFrom';




export type GameStatus = 'preload' | 'playing' | 'end' | '';

let Zone:any

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})

export class GameComponent implements OnInit, OnDestroy {

  // States
  public gameType:string;
  public title:string;
  public status:GameStatus = 'preload';
  public preloadReady:boolean = false;

  public cards:Word[];

  public preload$:Observable<number>
  private sub:Subscription

  public points:number = 0;
  public fails:number = 0;

  public isPreview:boolean = false;

  private gameID:string

  constructor(
    private srv:WordsService,
    private fx:SoundFXService,
    private il:ImageLoader,
    private route: ActivatedRoute,
  ) {}


  ngOnInit() {

    const noop = (a) => {}

    const params$ = this.route.params;
    const url$ = this.route.url;

    const getParams$ = withLatestFrom.call(
        params$, url$,
        (x,y)=>({p:x, r:y[0]})
    )

    const getStateFromRouter = (router) => {
      if(router.r.path=="preview") {
        this.isPreview = true;
      }
      if("id" in router.p) {
        this.gameID = router.p["id"];
      }
    }

    const getStateFromGame = (game) => {
      this.cards = game.words;
      this.gameType = game.tipus;
      this.status = 'preload'
    }

    const setPreloadReady = () => {
      console.log("[set preload ready]")
      this.preloadReady = true;
    }

    const preloadFac$ = (game) => {
      return this.preloadFx$(game);
    }


    this.sub = getParams$
      .do(getStateFromRouter)
      .switchMap(r => ("game" in r.p) ? this.fromDev(r) : this.fromDb(r))
      .do(getStateFromGame)
      .subscribe((game)=>{
        this.preload$ = this.preloadFx$(game)
          .do(null, null, setPreloadReady);
      })
      // .switchMap(preloadFac$)
      // .do(null, null, setPreloadReady);

  }

  // todo add preview...
  fromDb(router):Observable<any> {
    return this.srv
        .getGame(router.p["uid"], router.p["id"])
        .map(snap=>snap.val())
  }

  fromDev(router):Observable<any> {
    return this.srv.getWords().
        map((w)=>{
          console.log("w", w)
          return {
            tipus: router.p["game"],
            title: router.p["game"],
            words: w
          }
        })
  }


  startGame(event) {
    this.points = 0;
    this.fails = 0;
    this.status = 'playing';
  }

  onWin(event:number) {
    // console.log("Wins", event);
    this.points = event;
  }

  onFinish() {
    this.status = 'end';
  }

  onFail(event:number) {
    this.fails = event;
  }

  preloadFx$(game):Observable<number> {
    const loadAudio$ = this.fx.add(game.words.map(x=>x.audio));
    const loadImages$ = this.il.add(this.cards.map(x=>x.image));
    const merge = (a,b) => (a+b);
    return combineLatest.call(loadAudio$, loadImages$, merge);
  }

  get total():number {
    if(!this.cards) {
      return 0
    }
    return this.cards.length;
  }

  get tipus():string {
    if(!this.gameType) {
      return "CARR..."
    }
    return this.gameType.toUpperCase();
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
