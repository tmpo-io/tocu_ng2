import { Component, OnInit, Input,
  EventEmitter, Output } from '@angular/core';

import {state,
  style, transition, animate, trigger,
  AnimationEntryMetadata
 } from '@angular/core';

import { Word } from '../../services';
import { WordState } from "./word";
// import { WordAnimation } from "./word.animations";

type wordType = 'image' | 'text';

@Component({
  selector: "relaciona-word",
  templateUrl:"./word.component.html",
  styleUrls: ["./word.component.scss"],
  animations: [
    trigger('WordState', [
      state("normal", style({
        "border-color": "white"
      })),
      state("selected",   style({
        "border-color": "#73d4c5"
      })),
      state("played",   style({
        "border-color": "#b0b0b0",
        opacity: 0.6,
        filter: 'grayscale(100%)'
      })),
      state("error",   style({
        "border-color": "#f80707"
      })),
      transition('* <=> *', animate('300ms ease-in')),
    ])
  ]
})
export class RelacionaWordComponent {
  @Input() private word:Word;
  @Input() private status:WordState;
  @Input() private type:wordType;
}
