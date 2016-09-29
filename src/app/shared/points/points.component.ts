import { Component, Input, OnInit, OnChanges, SimpleChanges, state, style,
  transition, animate, trigger } from '@angular/core';

@Component({
  selector: "points",
  templateUrl:"./points.component.html",
  styleUrls: ["./points.component.scss"],
  animations: [
    trigger('TimerState', [
      state("preload",   style({
        transform: 'rotate(180deg)',
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
export class PointsComponent {
  @Input() private points:number;
  @Input() private total:number;
  @Input() private gamestatus:string;
}
