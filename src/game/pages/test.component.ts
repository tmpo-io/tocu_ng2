import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template:  `
    <button (click)="toggle=!toggle">restart</button>
    <app-lletres *ngIf="toggle"></app-lletres>
    `,
  styles: [
    `button { position: absolute; z-index: 10000; }
    app-lletres {
      box-sizing: border-box;
      top: 0px;
      left: 0px;
      position: absolute;
      width: 99%;
      height: 99%;
      border: 1px solid black;
    }`
  ]

})
export class TestComponent {

  public toggle: boolean = true;
  constructor() { }

}
