import { Component, Input, OnInit } from '@angular/core';

import { state, style, transition, animate, trigger }
  from '@angular/core';

@Component({
  selector: 'app-wordprogress',
  templateUrl: './wordprogress.component.html',
  styleUrls: ['./wordprogress.component.scss'],
  animations: [trigger('main', [
    state('*', style({
      transform: 'translate3d(0,0,0)'
    })),
    state('void', style({
      transform: 'translate3d(0,-100%,0)'
    })),
    transition('* <=> *', animate('900ms ease-in-out'))
  ])],
})
export class WordprogressComponent implements OnInit {

  @Input() word: string = '';
  @Input() index: number = 0;



  constructor() { }

  ngOnInit() {
  }


  get wword(): string[] {
    return this.word.split('');
  }

  get letters(): string[] {
    let w = this.wword;
    return this.index === 0 ? [] : w.slice(0, this.index);
  }

  get dashes(): string[] {
    let l = [];
    for (let i = this.index; i < this.wword.length; i++) {
      l.push('_');
    }
    return l;
  }


}
