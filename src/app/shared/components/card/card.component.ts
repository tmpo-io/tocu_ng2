import { Component, OnInit,
  Input, Output, EventEmitter, HostBinding } from '@angular/core';

import { state, style, transition, animate, trigger }
  from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('main', [
      state('*', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('void', style({
        transform: 'translate3d(0, -200%, 0)'
      })),
      transition('void => *', animate('900ms ease-in-out')),
      transition('* => void', animate('500ms ease-out'))
    ])
  ]
})
export class CardComponent implements OnInit {

  @HostBinding('@main') 'in';

  @Input()
  word;

  @Input()
  completed: boolean = false;

  @Output()
  onClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {

  }


}
