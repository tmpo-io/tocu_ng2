
import { Component, OnInit, EventEmitter } from '@angular/core'
import { MemoryService, SoundFXService, LoadStep } from '../../services';
import { Card } from '../card/card'; //@todo rename to Word


type GameStatus = 'preload' | 'playing' | 'end'


@Component({
  selector: 'memory-game',
  templateUrl: './memorygame.component.html',
  styleUrls: ['./memorygame.component.scss']
})
export class MemorygameComponent implements OnInit {

  // States
  public status:GameStatus = 'preload';
  public preloadReady:boolean = true;
  public preload:EventEmitter<LoadStep>
  public cards:Card[];

  // public loaded:number
  public lstep:LoadStep = {step:0, total:0}

  constructor(
    private srv:MemoryService,
    private fx:SoundFXService
  ) {}



  ngOnInit() {
    // Get words from server
    this.srv.getWords()
      .subscribe((card)=>{
        this.cards = card;
        this.preloadFx();
      })
  }

  startGame(event) {
    this.status = 'playing';
  }

  preloadFx() {
    let snd:string[] = [];
    this.cards.forEach((el, ind) => {
      snd.push(el.audio);
    });
    this.fx.add(snd);
    this.lstep.total = snd.length;
    this.preload = this.fx.preload();
    // @TODO game image preloader
    this.preload.subscribe((l:LoadStep) => {
      //console.log(l);
      this.lstep = l;
    }, ()=>{
      console.log('error loading audios');
    }, ()=>{
      console.log("Preload ready");
      this.lstep.step = this.lstep.total;
      this.preloadReady = true;

    })
  }


}
