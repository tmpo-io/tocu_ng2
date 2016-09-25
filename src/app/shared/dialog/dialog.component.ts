import {
  Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';

import {state,
  style, transition,
  animate, trigger } from '@angular/core';




@Component({
  selector: "ti-dialog",
  templateUrl:"./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
  host: {
      '[@flyInOut]': 'state'
  },
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translate3d(-50%, -50%, 0)'})),
      transition('void => *', [
        style({transform: 'translate3d(-50%, -200%, 0)'}),
        animate('1s ease-in-out')
      ]),
      transition('* => void', [
        style({transform: 'translate3d(-50%, 200%, 0)'}),
        animate('600ms ease-in')
      ])
    ]),
    trigger('delayed', [
      transition('void => *', [
        style({top: '-300px'}),
        animate('600ms 200ms ease-in-out')
      ]),
    ]),
    trigger('delayed2', [
      transition('void => *', [
        style({top: '-300px', opacity: 0}),
        animate('600ms 400ms ease-in-out')
      ]),
    ])

  ]
})


export class TiDialogComponent implements OnInit {

  @Input() public title:string;
  @Input() public showButton:boolean;
  @Input() public button:string;

  @Output() onClick = new EventEmitter<boolean>();

  public state: string = "in";

  ngOnInit() {}

  click() {
    this.onClick.emit(true);
  }

}
