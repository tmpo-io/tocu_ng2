import {
  Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation
} from '@angular/core';

import {state,
  style, transition,
  animate, trigger } from '@angular/core';


@Component({
  selector: "ti-dialog",
  // encapsulation: ViewEncapsulation.None,
  templateUrl:"./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
  host: {
      '[@flyInOut]': 'state'
  },
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translate3d(-50%, -50%, 0)'})),
      state('void', style({
        transform: 'translate3d(-50%, -300%, 0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(-50%, -300%, 0)'}),
        animate('500ms ease-in')
      ]),
      transition('* => void', [
        style({
          transform: 'translate3d(-50%, -50%, 0)',
        }),
        animate('300ms ease-out')
      ])
    ]),
    trigger('delayed', [
      transition('void => *', [
        style({top: '-300px'}),
        animate('300ms 400ms ease-in-out')
      ])
    ])
  ]
})
export class TiDialogComponent implements OnInit {
  @Input() public title:string;
  public state: string = "in";
  ngOnInit() {}
}
