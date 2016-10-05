import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

import {state,
  style, transition, animate, trigger,
  AnimationEntryMetadata
 } from '@angular/core';

import { Word } from '../../services';
import { WordState } from "./word";
import { WordAnimation } from "./word.animations";

type wordType = 'image' | 'text';

@Component({
  selector: "relaciona-word",
  templateUrl:"./word.component.html",
  styleUrls: ["./word.component.scss"],
  animations: WordAnimation
})
export class RelacionaWordComponent {
  @Input() private word:Word;
  @Input() private status:WordState;
  @Input() private type:wordType;
}
