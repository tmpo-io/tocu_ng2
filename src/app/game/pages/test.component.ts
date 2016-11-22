import {
  Component,
  EventEmitter,
  OnInit
} from '@angular/core';

import { CHARS } from '../lletres/chars';

@Component({
  selector: 'app-test',
  template: `
    <button (click)="toggle=!toggle">restart</button>
    <app-lletres *ngIf="toggle"
      [lletraA]="lletres$ | async"></app-lletres>
    <div class="lletres">
     <span
      (click)="play(lletra)"
      *ngFor="let lletra of chars">{{ lletra }}</span>
    </div>
    `,
  styles: [
    `
    button { position: absolute; z-index: 10000; }
    app-lletres {
      box-sizing: border-box;
      top: 0px;
      left: 10%;
      position: absolute;
      width: 80%;
      height: 80%;
      border: 1px solid grey;
    }
    app-lletres-editor {
      left: 50%;
    }
    .lletres {
      position: absolute;
      bottom: 10%;
      overflow: hidden;
      overflow-x: auto;
      width: 100%;
    }
    .lletres span {
      cursor: pointer;
      font-size: 24px;
      padding: 10px;
    }
    `
  ]

})
export class TestComponent implements OnInit {

  lletres$ = new EventEmitter<number[][]>();

  chars = Object.keys(CHARS);

  public toggle: boolean = true;
  constructor() { }

  ngOnInit() {

  }

  play(s: string) {
    this.toggle = false;
    setTimeout(() => {
      this.toggle = true;
      setTimeout(() => {
        this.lletres$.next(CHARS[s]);
      });
    }, 300);
  }

}
