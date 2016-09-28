import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges,
  state, style, transition, animate, trigger } from '@angular/core';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

type timerStatus = 'start' | 'stop';

@Component({
  selector: "timer",
  templateUrl:"./timer.component.html",
  styleUrls: ["./timer.component.scss"],
  animations: [
    trigger('TimerState', [
      state("preload",   style({
        transform: 'rotate(-180deg)',
      })),
      state("playing", style({
        transform: 'rotate(0)',
      })),
      state("end",   style({
        transform: 'rotate(-180deg)',
      })),
      transition('* <=> *', animate('450ms ease-in')),
    ])
  ]
})
export class TimerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() private gamestatus:string;

  private tick: string;
  private subscription:any = undefined;

  private formatMMSS(s:number):string {
    let mm:number = (s-(s%=60))/60;
    return (9<mm?'':'0')+mm+(9<s?':':':0')+s;
  }

  private startTimer() {
    if(this.subscription!=undefined) {
      return;
    }
    let timer = TimerObservable.create(0, 1000);
    this.subscription = timer.subscribe(t => {
      this.tick = this.formatMMSS(t);
    });
  }

  private stopTimer() {
    if(this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  public ngOnInit() {
    this.tick = this.formatMMSS(0);
  }

  public ngOnChanges(s:SimpleChanges) {
    if(this.gamestatus=="playing") {
      this.startTimer();
    } else if(this.gamestatus=="end") {
      this.stopTimer();
    }
  }

  public ngOnDestroy() {
    this.stopTimer();
  }
}
