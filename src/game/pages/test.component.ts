import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template:  `<app-ti-sprite [steps]="[[1, 100], [2, 2000], [1, 500],[3, 100]]">
    </app-ti-sprite>
    `

})
export class TestComponent {
  constructor() { }

}
