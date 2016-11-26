import { Component } from '@angular/core';

@Component({
  selector: 'app-small',
  template: `
  <div>
    <p>Hello {{ name }}</p>
    <p *ngIf="flag">Test</p>
  </div>`
})
export class SmallComponent {

  name = 'Angular';
  flag = true;


  constructor() { }

}
