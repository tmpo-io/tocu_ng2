import {
  Component, OnInit, OnChanges, Input, state,
  style, transition, animate, trigger
 } from '@angular/core';

import { LetterState } from "./letter";
import { getColor } from '../../helpers';

@Component({
  selector: "sequencing-letter",
  templateUrl:"./letter.component.html",
  styleUrls: ["./letter.component.scss"],
  animations: []
})
export class SequencingLetterComponent {
  @Input() letter;
  @Input() status;
}
