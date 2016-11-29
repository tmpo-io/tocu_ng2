import {
  Component,
  OnInit
} from '@angular/core';


@Component({
  selector: 'app-test',
  template: `
    <button (click)="toggle=!toggle">Toggle</button>
    <app-globus *ngIf="toggle"></app-globus>
    `,
  styles: [
    `
    button { position: absolute; z-index: 10000; }
    app-globus {
      box-sizing: border-box;
      top: 0px;
      left: 0;
      position: absolute;
      width: 99%;
      height: 99%;
      border: 1px solid grey;
    }
    `
  ]

})
export class TestComponent implements OnInit {


  public toggle: boolean = true;
  constructor() { }

  ngOnInit() {

  }


}
