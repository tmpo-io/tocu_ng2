import { Observable } from 'rxjs/Rx';
import {
  Component, OnInit, Input, EventEmitter, Output,
} from '@angular/core';

import {state,
  style, transition, animate, trigger,
  AnimationEntryMetadata
 } from '@angular/core';

@Component({
  selector: "mixed-word",
  templateUrl:"./word.component.html",
  styleUrls: ["./word.component.scss"],
})
export class MixedWordComponent {
  @Input() word;
  @Input() status;
}
