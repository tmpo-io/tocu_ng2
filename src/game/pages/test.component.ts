import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test',
  template:  `
    <button (click)="toggle=!toggle">restart</button>
    <app-lletres-editor
      (onLletres)="lletres$.next($event)" *ngIf="toggle"></app-lletres-editor>
    <app-lletres *ngIf="toggle"
      [lletraA]="lletres$ | async"></app-lletres>
    `,
  styles: [
    `button { position: absolute; z-index: 10000; }
    app-lletres-editor, app-lletres {
      box-sizing: border-box;
      top: 0px;
      left: 0px;
      position: absolute;
      width: 50%;
      height: 50%;
      border: 1px solid black;
    }
    app-lletres-editor {
      left: 50%;
    }
    `
  ]

})
export class TestComponent {

  lletres$ = new EventEmitter<number[][]>();

  public toggle: boolean = true;
  constructor() { }

}
