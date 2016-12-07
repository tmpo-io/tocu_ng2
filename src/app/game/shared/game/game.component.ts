import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { GameSession } from '../../../models/gamesession';
import { Word } from '../../../models/word';
import { Joc } from '../../../models/joc';

import {
  WordsService,
  SoundFXService,
  ImageLoader
} from '../../services';

import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { combineLatest } from 'rxjs/operator/combineLatest';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/takeWhile';


export type GameStatus = 'preload' | 'playing' | 'end' | '';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {

  // States
  public gameType: string;
  public title: string;
  public status: GameStatus = 'preload';
  public preloadReady: boolean = false;

  public cards: Word[];
  public game: Joc;

  public preload$: Observable<number>;
  private sub: Subscription;

  public points: number = 0;
  public fails: number = 0;

  public isPreview: boolean = false;
  private gameID: string;

  constructor(
    private srv: WordsService,
    private fx: SoundFXService,
    private il: ImageLoader,
    private route: ActivatedRoute,
    public loc: Location,
    public store$: Store<GameSession>
  ) { }

  ngOnInit() {

    // console.log('From store', this.fromStore);

    const params$ = this.route.params;
    const url$ = this.route.url;

    const getParams$ = withLatestFrom.call(
      params$, url$,
      (x, y) => ({ p: x, r: y[0] })
    );

    const getStateFromRouter = (router) => {
      if (router.r.path === 'preview') {
        this.isPreview = true;
      }
      if ('id' in router.p) {
        this.gameID = router.p['id'];
      }
    };

    const getStateFromGame = (game) => {
      this.cards = game.words;
      this.gameType = game.tipus;
      this.game = game;
      this.status = 'preload';
    };

    const setPreloadReady = () => {
      this.preloadReady = true;
    };

    this.preload$ = getParams$
      .do(getStateFromRouter)
      .switchMap(r => {
        return this.store$
          .select('gameSession')
          .switchMap((s: GameSession) => {
            if (s.loadJocs === 'ready') {
              let joc = s.jocs.filter(j => j.id === r.p['id']);
              return Observable.of(joc[0]);
            } else {
              if ('game' in r.p) {
                return this.fromDev(r);
              }
              return this.fromDb(r);
            }
          });
      })
      .do(getStateFromGame)
      .switchMap((game) => this.preloadFx$(game))
      .takeWhile(r => r < (this.cards.length * 2))
      .do(null, null, setPreloadReady);
  }

  // todo add preview...
  fromDb(router): Observable<any> {
    return this.srv
      .getGame(router.p['uid'], router.p['id'])
      .map(snap => snap.val());
  }

  fromDev(router): Observable<any> {
    return this.srv.getWords().
      map((w) => {
        return {
          tipus: router.p['game'],
          title: router.p['game'],
          words: w
        };
      });
  }

  startGame(event) {
    this.points = 0;
    this.fails = 0;
    this.status = 'playing';
  }

  onWin(event: number) {
    // console.log("Wins", event);
    this.points = event;
  }

  onFinish() {
    this.status = 'end';
  }

  onFail(event: number) {
    this.fails = event;
  }

  preloadFx$(game): Observable<number> {
    const loadAudio$ = this.fx.add(game.words.map(x => x.audio));
    const loadImages$ = this.il.add(game.words.map(x => x.image));
    const merge = (a, b) => (a + b);
    return combineLatest.call(loadAudio$, loadImages$, merge);
  }

  get total(): number {
    if (!this.cards) {
      return 0;
    }
    if (this.gameType === 'memory' && this.cards.length >= 8) {
      return 8;
    }
    return this.cards.length;
  }

  get tipus(): string {
    if (!this.gameType) {
      return 'CARR...';
    }
    return this.gameType.toUpperCase();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.cards.map(w => {
      this.fx.delete(w.audio);
    });
  }

}
