import { state, style, transition, animate, trigger } from '@angular/core';


export const SequencingAnimation:any[] = [
  trigger('WordState', [
    state('out', style({
      transform: 'translateY(-100%)',
      opacity: 0
    })),
    state('in',   style({
      transform: 'translateY(0)',
      opacity: 1
    })),
    transition('out <=> in', animate('300ms ease-in')),
  ]),
  trigger('letterState', [
    state('out', style({
      transform: 'translateY(10%)',
      opacity: 0
    })),
    state('in',   style({
      transform: 'translateY(0)',
      opacity: 1
    })),
    transition('out <=> in', animate('300ms ease-in')),
  ]),
  trigger('image', [
    state('*', style({
      opacity: 1
    })),
    state('void', style({
      opacity: 0
    })),
    transition('void => *', animate('300ms ease-in')),
  ])
];
