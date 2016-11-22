
import { Component, Input,
  state, trigger, style,
  transition, animate } from '@angular/core';

import { Word } from '../../../models/word';
import { WordState } from './word';

export type wordType = 'image' | 'text';

@Component({
  selector: 'relaciona-word',
  templateUrl:'./word.component.html',
  styleUrls: ['./word.component.scss'],
  animations: [
    trigger('WordState', [
      state('normal', style({
        'border-color': 'white'
      })),
      state('selected',   style({
        'border-color': '#73d4c5'
      })),
      state('played',   style({
        'border-color': '#b0b0b0',
        opacity: 0.6,
        filter: 'grayscale(100%)'
      })),
      state('error',   style({
        'border-color': '#f80707'
      }))
    ])
  ]
})
export class RelacionaWordComponent {
  @Input() word: Word;
  @Input() status: WordState;
  @Input() type: wordType;
}
