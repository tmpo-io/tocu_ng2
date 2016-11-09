import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template:  `
    <button (click)="toggle=!toggle">TOGGLE</button><br/>
    <app-ti-sprite *ngIf="toggle" [steps]="
      [[1,3000], [2,100], [1,100], [3,100], [1,100], [3,100]]"
      width="100" height="100"
      sprite="/assets/img/tocu_anim.png" >
    </app-ti-sprite>
    `

})
export class TestComponent {

  public toggle: boolean = true;
  constructor() { }

}
