import { state, style, transition, animate, trigger } from '@angular/core';
import { getColor } from '../../helpers';
import { WordState } from "./word";

export const WordAnimation:any[] = [
  trigger('WordState', [
    state(WordState.Normal, style({
      "border-color": "white"
    })),
    state(WordState.Selected,   style({
      "border-color": getColor("verd")
    })),
    state(WordState.Played,   style({
      "border-color": getColor("gris"),
      opacity: 0.6,
      filter: 'grayscale(100%)'
    })),
    state(WordState.Error,   style({
      "border-color": getColor("vermell")
    })),
    transition('* <=> *', animate('300ms ease-in')),
  ])
];
