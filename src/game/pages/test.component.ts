import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template:  `
    <button (click)="toggle=!toggle">TOGGLE</button><br/>
    <ti-canvasexplosion
      *ngIf="toggle"></ti-canvasexplosion>
    `,
  styles: [
    `
    button { position: absolute; z-index:100; }
    ti-canvasexplosion {
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
